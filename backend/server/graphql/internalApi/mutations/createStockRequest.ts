import { nonNull, mutationField, intArg, list } from 'nexus';
import { requestProductsInputType, stockRequestType } from '../types';

type StockRegistrations = {
  stock_id: number;
}[];

export const createStockRequestField = mutationField((t) => {
  t.nonNull.field('createStockRequest', {
    type: stockRequestType,
    args: {
      internalUserId: nonNull(intArg()),
      requestProducts: nonNull(list(nonNull(requestProductsInputType))),
    },
    resolve: async (_, args, ctx) => {
      let stockRegistrations: StockRegistrations = [];
      for (const requestProduct of args.requestProducts) {
        const stocks = await ctx.prisma.product
          .findUnique({ where: { id: requestProduct.productId } })
          .stocks({
            where: {
              stockAllocation: null,
              stockRequestStockRegistration: null,
            },
            take: requestProduct.count,
            include: { product: true },
          });
        if (stocks.length !== requestProduct.count) {
          throw Error(`${stocks[0]?.product.name}の在庫数が足りません。`);
        }
        const stockIds = stocks.map((s) => ({ stock_id: s.id }));
        stockRegistrations = [...stockRegistrations, ...stockIds];
      }

      return await ctx.prisma.stockRequest.create({
        data: {
          internalUser: { connect: { id: args.internalUserId } },
          stockRegistrations: {
            createMany: {
              data: stockRegistrations,
            },
          },
        },
      });
    },
  });
});
