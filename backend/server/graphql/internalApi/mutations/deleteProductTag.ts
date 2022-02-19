import { nonNull, mutationField, intArg } from 'nexus';
import { deleteType } from '../types/';

export const deleteProductTagField = mutationField((t) => {
  t.nonNull.field('deleteProductTag', {
    type: deleteType,
    args: {
      id: nonNull(intArg()),
    },
    resolve: async (_, args, ctx) => {
      const deleted = await ctx.prisma.productTag.delete({
        where: { id: args.id },
      });
      return { deleted: !!deleted };
    },
  });
});
