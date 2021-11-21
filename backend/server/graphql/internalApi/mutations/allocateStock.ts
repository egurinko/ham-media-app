import { nonNull, mutationField, intArg, arg } from 'nexus';
import { stockType } from '../types';

export const allocateStockField = mutationField((t) => {
  t.nonNull.field('allocateStock', {
    type: stockType,
    args: {
      id: nonNull(intArg()),
      internalUserId: nonNull(arg({ type: 'BigInt' })),
    },
    resolve: async (_, args, ctx) => {
      return await ctx.prisma.stock.update({
        where: { id: args.id },
        data: {
          stockAllocation: {
            create: { internal_user_id: args.internalUserId },
          },
        },
      });
    },
  });
});
