import { nonNull, mutationField, arg } from 'nexus';
import { internalUserType } from '../types/internalUserType';

export const deleteInternalUserField = mutationField((t) => {
  t.nonNull.field('deleteInternalUser', {
    type: internalUserType,
    args: {
      id: nonNull(arg({ type: 'BigInt' })),
    },
    resolve: async (_, args, ctx) => {
      return ctx.prisma.internalUser.delete({
        where: {
          id: args.id,
        },
      });
    },
  });
});
