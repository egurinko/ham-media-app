import { nonNull, mutationField, intArg } from 'nexus';
import { productTaggingType } from '../types';

export const deleteProductTaggingField = mutationField((t) => {
  t.nonNull.field('deleteProductTagging', {
    type: productTaggingType,
    args: {
      id: nonNull(intArg()),
    },
    resolve: async (_, args, ctx) => {
      return await ctx.prisma.productTagging.delete({
        where: { id: args.id },
      });
    },
  });
});
