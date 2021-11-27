import { queryField } from 'nexus';
import { productTagGroupType } from '../types';

export const productTagGroups = queryField((t) => {
  t.nonNull.list.nonNull.field('productTagGroups', {
    type: productTagGroupType,
    resolve: async (_root, _args, ctx) => {
      return await ctx.prisma.productTagGroup.findMany({
        include: { productTags: true },
      });
    },
  });
});
