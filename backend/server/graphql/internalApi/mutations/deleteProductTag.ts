import { nonNull, mutationField, intArg } from 'nexus';
import { productTagType } from '../types';

export const deleteProductTagField = mutationField((t) => {
  t.nonNull.field('deleteProductTag', {
    type: productTagType,
    args: {
      id: nonNull(intArg()),
    },
    resolve: async (_, args, ctx) => {
      return await ctx.prisma.productTag.delete({ where: { id: args.id } });
    },
  });
});
