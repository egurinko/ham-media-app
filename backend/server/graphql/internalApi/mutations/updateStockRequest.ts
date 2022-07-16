import { nonNull, mutationField, list, intArg } from 'nexus';
import { requestProductsInputType, stockRequestType } from '../types';
import Mercurius from 'mercurius';
import { judgeError } from '@/services/error/judge';
import { postStockRequestUpdateAlert } from '@/services/api/discordApi';

type ProductRegistrations = {
  product_id: number;
}[];

export const updateStockRequestField = mutationField((t) => {
  t.nonNull.field('updateStockRequest', {
    type: stockRequestType,
    args: {
      id: nonNull(intArg()),
      requestProducts: nonNull(list(nonNull(requestProductsInputType))),
    },
    resolve: async (_, args, ctx) => {
      let productRegistrations: ProductRegistrations = [];
      for (const requestProduct of args.requestProducts) {
        const stocks = await ctx.prisma.product
          .findUniqueOrThrow({ where: { id: requestProduct.productId } })
          .stocks({
            where: { stockAllocation: null },
            include: { product: true },
          });
        if (stocks.length < requestProduct.count) {
          throw Error(`${stocks[0]?.product.name}の在庫数が足りません。`);
        }

        const productIds = Array(requestProduct.count).fill({
          product_id: requestProduct.productId,
        });
        productRegistrations = [...productRegistrations, ...productIds];
      }

      try {
        const [_deleted, stockRequest] = await ctx.prisma.$transaction([
          ctx.prisma.stockRequestProductRegistration.deleteMany({
            where: { stock_request_id: args.id },
          }),
          ctx.prisma.stockRequest.update({
            where: { id: args.id },
            data: {
              productRegistrations: {
                createMany: {
                  data: productRegistrations,
                },
              },
            },
            include: {
              productRegistrations: { include: { product: true } },
              internalUser: true,
            },
          }),
        ]);

        postStockRequestUpdateAlert(stockRequest);

        return stockRequest;
      } catch (e) {
        const { key, message, statusCode } = judgeError(e);
        throw new Mercurius.ErrorWithProps(message, {
          key,
          message,
          statusCode,
        });
      }
    },
  });
});
