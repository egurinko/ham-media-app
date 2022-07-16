import { nonNull, mutationField, intArg, stringArg } from 'nexus';
import { deleteType } from '../types/';
import Mercurius from 'mercurius';
import { judgeError } from '@/services/error/judge';
import { postStockRequestRejectionAlert } from '@/services/api/discordApi';

export const rejectStockRequestField = mutationField((t) => {
  t.nonNull.field('rejectStockRequest', {
    type: deleteType,
    args: {
      id: nonNull(intArg()),
      message: nonNull(stringArg()),
    },
    resolve: async (_, args, ctx) => {
      const stockRequest = await ctx.prisma.stockRequest.findUniqueOrThrow({
        where: { id: args.id },
        include: {
          productRegistrations: { include: { product: true } },
          internalUser: true,
        },
      });
      try {
        const deleted = await ctx.prisma.stockRequest.delete({
          where: { id: args.id },
        });
        postStockRequestRejectionAlert(
          stockRequest,
          ctx.currentInternalUser!,
          args.message
        );
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
