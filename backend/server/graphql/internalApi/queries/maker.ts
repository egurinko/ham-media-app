import { queryField, nonNull, intArg } from 'nexus';
import { makerType } from '../types';

export const maker = queryField((t) => {
  t.nonNull.field('maker', {
    type: makerType,
    args: {
      id: nonNull(intArg()),
    },
    resolve: async (_root, args, ctx) => {
      return await ctx.prisma.maker.findUniqueOrThrow({
        where: { id: args.id },
      });
    },
  });
});
