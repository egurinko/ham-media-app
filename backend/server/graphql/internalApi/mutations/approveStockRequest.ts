import { nonNull, mutationField, intArg, stringArg } from 'nexus';
import { deleteType } from '../types/';
import Mercurius from 'mercurius';
import { judgeError } from '@/services/error/judge';
import { postStockRequestApprovalAlert } from '@/services/api/discordApi';

export const approveStockRequestField = mutationField((t) => {
  t.nonNull.field('approveStockRequest', {
    type: deleteType,
    args: {
      id: nonNull(intArg()),
      message: nonNull(stringArg()),
    },
    resolve: async (_, args, ctx) => {
      const stockRequest = await ctx.prisma.stockRequest.findUnique({
        where: { id: args.id },
        include: {
          internalUser: true,
          productRegistrations: { include: { product: true } },
        },
      });
      try {
        const deleted = await ctx.prisma.stockRequest.delete({
          where: { id: args.id },
        });
        postStockRequestApprovalAlert(
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
