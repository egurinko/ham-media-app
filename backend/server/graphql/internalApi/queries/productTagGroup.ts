import { intArg, nonNull, queryField } from 'nexus';
import { productTagGroupType } from '../types';

export const productTagGroup = queryField((t) => {
  t.nonNull.field('productTagGroup', {
    type: productTagGroupType,
    args: {
      id: nonNull(intArg()),
    },
    resolve: async (_root, args, ctx) => {
      return await ctx.prisma.productTagGroup.findUniqueOrThrow({
        where: { id: args.id },
        include: { productTags: true },
      });
    },
  });
});
