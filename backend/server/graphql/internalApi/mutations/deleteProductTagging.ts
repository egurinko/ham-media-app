import { nonNull, mutationField, intArg } from 'nexus';
import { deleteType } from '../types';

export const deleteProductTaggingField = mutationField((t) => {
  t.nonNull.field('deleteProductTagging', {
    type: deleteType,
    args: {
      id: nonNull(intArg()),
    },
    resolve: async (_, args, ctx) => {
      const deleted = await ctx.prisma.productTagging.delete({
        where: { id: args.id },
        include: { productTag: true },
      });
      return { deleted: !!deleted };
    },
  });
});
