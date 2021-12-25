import { queryField, intArg, nonNull } from 'nexus';
import { productType } from '../types';

export const product = queryField((t) => {
  t.nonNull.field('product', {
    type: productType,
    args: { id: nonNull(intArg()) },
    resolve: async (_root, args, ctx) => {
      return await ctx.prisma.product.findUnique({
        where: { id: args.id },
        include: { maker: true, stocks: true },
      });
    },
  });
});
