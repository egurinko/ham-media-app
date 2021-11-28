import { intArg, nonNull, queryField } from 'nexus';
import { productTagGroupType } from '../types';

export const productTagGroup = queryField((t) => {
  t.nonNull.field('productTagGroup', {
    type: productTagGroupType,
    args: {
      id: nonNull(intArg()),
    },
    resolve: async (_root, args, ctx) => {
      const productTagGroup = await ctx.prisma.productTagGroup.findUnique({
        where: { id: args.id },
        include: { productTags: true },
      });
      if (!productTagGroup) {
        throw new Error('Not Found');
      }
      return productTagGroup;
    },
  });
});
