import { nonNull, mutationField, intArg } from 'nexus';
import { deleteType } from '../types/';

export const deleteMakerField = mutationField((t) => {
  t.nonNull.field('deleteMaker', {
    type: deleteType,
    args: {
      id: nonNull(intArg()),
    },
    resolve: async (_, args, ctx) => {
      const deleted = await ctx.prisma.maker.delete({
        where: {
          id: args.id,
        },
      });
      return { deleted: !!deleted };
    },
  });
});
