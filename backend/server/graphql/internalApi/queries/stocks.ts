import { intArg, nonNull, queryField } from 'nexus';
import { stockType } from '../types';

export const stocks = queryField((t) => {
  t.nonNull.list.nonNull.field('stocks', {
    type: stockType,
    args: {
      productId: nonNull(intArg()),
    },
    resolve(_root, args, ctx) {
      return ctx.prisma.stock.findMany({
        where: { product_id: args.productId },
        include: { stockAllocation: { include: { internalUser: true } } },
      });
    },
  });
});
