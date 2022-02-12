import { queryField, list, intArg, nonNull } from 'nexus';
import { productType } from '../types';

export const products = queryField((t) => {
  t.nonNull.list.nonNull.field('products', {
    type: productType,
    args: {
      ids: list(nonNull(intArg())),
    },
    resolve: async (_root, args, ctx) => {
      return await ctx.prisma.product.findMany({
        include: { maker: true, stocks: true },
        where: { id: { in: args.ids || undefined } },
      });
    },
  });
});
