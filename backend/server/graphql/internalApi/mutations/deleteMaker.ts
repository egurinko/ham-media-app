import { nonNull, mutationField, intArg } from 'nexus';
import { makerType } from '../types';

export const deleteMakerField = mutationField((t) => {
  t.nonNull.field('deleteMaker', {
    type: makerType,
    args: {
      id: nonNull(intArg()),
    },
    resolve: async (_, args, ctx) => {
      return ctx.prisma.maker.delete({
        where: {
          id: args.id,
        },
      });
    },
  });
});
