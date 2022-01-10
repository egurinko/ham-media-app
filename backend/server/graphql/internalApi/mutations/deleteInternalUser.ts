import { nonNull, mutationField, arg } from 'nexus';
import { deleteType } from '../types/';

export const deleteInternalUserField = mutationField((t) => {
  t.nonNull.field('deleteInternalUser', {
    type: deleteType,
    args: {
      id: nonNull(arg({ type: 'BigInt' })),
    },
    resolve: async (_, args, ctx) => {
      const deleted = await ctx.prisma.internalUser.delete({
        where: { id: args.id },
      });
      return { deleted: !!deleted };
    },
  });
});
