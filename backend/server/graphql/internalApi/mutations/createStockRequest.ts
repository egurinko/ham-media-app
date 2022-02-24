import { nonNull, mutationField, list } from 'nexus';
import { requestProductsInputType, stockRequestType } from '../types';
import Mercurius from 'mercurius';
import { judgeError } from '@/services/error/judge';
import { postStockRequestAlert } from '@/services/api/discordApi';

type ProductRegistrations = {
  product_id: number;
}[];

export const createStockRequestField = mutationField((t) => {
  t.nonNull.field('createStockRequest', {
    type: stockRequestType,
    args: {
      requestProducts: nonNull(list(nonNull(requestProductsInputType))),
    },
    resolve: async (_, args, ctx) => {
      let productRegistrations: ProductRegistrations = [];
      for (const requestProduct of args.requestProducts) {
        const stocks = await ctx.prisma.product
          .findUnique({ where: { id: requestProduct.productId } })
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
        const stockRequest = await ctx.prisma.stockRequest.create({
          data: {
            internalUser: { connect: { id: ctx.currentInternalUser!.id } },
            productRegistrations: {
              createMany: {
                data: productRegistrations,
              },
            },
          },
          include: {
            productRegistrations: { include: { product: true } },
          },
        });

        postStockRequestAlert(stockRequest, ctx.currentInternalUser!);

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
