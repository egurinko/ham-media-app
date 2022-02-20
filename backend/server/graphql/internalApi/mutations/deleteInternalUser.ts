import { nonNull, mutationField, arg } from 'nexus';
import Mercurius from 'mercurius';
import { judgeError } from '@/services/error/judge';
import { deleteType } from '../types/';

export const deleteInternalUserField = mutationField((t) => {
  t.nonNull.field('deleteInternalUser', {
    type: deleteType,
    args: {
      id: nonNull(arg({ type: 'BigInt' })),
    },
    resolve: async (_, args, ctx) => {
      try {
        const deleted = await ctx.prisma.internalUser.delete({
          where: { id: args.id },
        });
        return { deleted: !!deleted };
      } catch (e) {
        const { key, message, statusCode } = judgeError(e);
        throw new Mercurius.ErrorWithProps(message, {
          key,
          message,
          statusCode,
        });
      }
    },
  });
});
