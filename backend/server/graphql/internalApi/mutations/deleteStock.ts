import { nonNull, mutationField, intArg } from 'nexus';
import { deleteType } from '../types/';
import Mercurius from 'mercurius';
import { judgeError } from '@/services/error/judge';

export const deleteStockField = mutationField((t) => {
  t.nonNull.field('deleteStock', {
    type: deleteType,
    args: {
      id: nonNull(intArg()),
    },
    resolve: async (_, args, ctx) => {
      const stockAllocation = await ctx.prisma.stockAllocation.findUnique({
        where: { stock_id: args.id },
        rejectOnNotFound: false,
      });

      try {
        if (stockAllocation) {
          const [_, stock] = await ctx.prisma.$transaction([
            ctx.prisma.stockAllocation.delete({ where: { stock_id: args.id } }),
            ctx.prisma.stock.delete({
              where: { id: args.id },
              include: { stockAllocation: { include: { internalUser: true } } },
            }),
          ]);
          return { deleted: !!stock };
        } else {
          const deleted = await ctx.prisma.stock.delete({
            where: { id: args.id },
            include: { stockAllocation: { include: { internalUser: true } } },
          });
          return { deleted: !!deleted };
        }
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
