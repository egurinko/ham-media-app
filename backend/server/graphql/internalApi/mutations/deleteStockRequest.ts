import { nonNull, mutationField, intArg } from 'nexus';
import { deleteType } from '../types/';
import Mercurius from 'mercurius';
import { judgeError } from '@/services/error/judge';

export const deleteStockRequestField = mutationField((t) => {
  t.nonNull.field('deleteStockRequest', {
    type: deleteType,
    args: {
      id: nonNull(intArg()),
    },
    resolve: async (_, args, ctx) => {
      try {
        const deleted = await ctx.prisma.stockRequest.delete({
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
