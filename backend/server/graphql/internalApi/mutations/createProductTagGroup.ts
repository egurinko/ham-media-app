import { stringArg, nonNull, mutationField } from 'nexus';
import { productTagGroupType } from '../types';

export const createProductTagGroupField = mutationField((t) => {
  t.nonNull.field('createProductTagGroup', {
    type: productTagGroupType,
    args: { name: nonNull(stringArg()) },
    resolve: async (_, args, ctx) => {
      return await ctx.prisma.productTagGroup.create({
        data: { name: args.name },
        include: { productTags: true },
      });
    },
  });
});
