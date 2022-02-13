import { nonNull, mutationField, intArg, list } from 'nexus';
import { stockType, stocksInputType } from '../types';

type Stock = {
  expired_at: string;
  internal_user_id: number;
};

export const createStocksField = mutationField((t) => {
  t.nonNull.list.nonNull.field('createStocks', {
    type: stockType,
    args: {
      productId: nonNull(intArg()),
      stocks: nonNull(list(nonNull(stocksInputType))),
    },
    resolve: async (_, args, ctx) => {
      const stocks = args.stocks.reduce((acc: Stock[], stock) => {
        const newStocks = [...Array(stock.amount)].map((_) => ({
          expired_at: stock.expiredAt,
          internal_user_id: stock.internalUserId,
        }));
        return [...acc, ...newStocks];
      }, []);
      const product = await ctx.prisma.product.update({
        where: { id: args.productId },
        data: {
          stocks: {
            createMany: {
              data: stocks,
            },
          },
        },
        include: {
          stocks: {
            include: { stockAllocation: { include: { internalUser: true } } },
          },
        },
      });
      return product.stocks;
    },
  });
});
