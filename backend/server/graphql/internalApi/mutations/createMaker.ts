import { stringArg, nonNull, mutationField } from 'nexus';
import { makerType } from '../types';

export const createMakerField = mutationField((t) => {
  t.nonNull.field('createMaker', {
    type: makerType,
    args: { name: nonNull(stringArg()) },
    resolve: async (_, args, ctx) => {
      return ctx.prisma.maker.create({ data: { name: args.name } });
    },
  });
});
