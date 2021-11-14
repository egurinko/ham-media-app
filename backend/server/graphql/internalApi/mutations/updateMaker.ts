import { stringArg, intArg, nonNull, mutationField } from 'nexus';
import { makerType } from '../types';

export const updateMakerField = mutationField((t) => {
  t.nonNull.field('updateMaker', {
    type: makerType,
    args: {
      id: nonNull(intArg()),
      name: nonNull(stringArg()),
    },
    resolve: async (_, args, ctx) => {
      return ctx.prisma.maker.update({
        data: {
          name: args.name,
        },
        where: {
          id: args.id,
        },
      });
    },
  });
});
