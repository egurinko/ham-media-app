import { nonNull, mutationField, intArg } from 'nexus';
import { stockType } from '../types';

export const returnStockField = mutationField((t) => {
  t.nonNull.field('returnStock', {
    type: stockType,
    args: {
      id: nonNull(intArg()),
    },
    resolve: async (_, args, ctx) => {
      return await ctx.prisma.stock.update({
        where: { id: args.id },
        data: {
          stockAllocation: {
            delete: true,
          },
        },
      });
    },
  });
});
