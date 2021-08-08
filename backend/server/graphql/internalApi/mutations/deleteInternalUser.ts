import { intArg, nonNull, mutationField } from 'nexus';
import { internalUserType } from '../types/internalUserType';

export const deleteInternalUserField = mutationField((t) => {
  t.nonNull.field('deleteInternalUser', {
    type: internalUserType,
    args: {
      id: nonNull(intArg()),
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
