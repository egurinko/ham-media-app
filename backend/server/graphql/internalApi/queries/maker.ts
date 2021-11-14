import { queryField, nonNull, intArg } from 'nexus';
import { makerType } from '../types';

export const maker = queryField((t) => {
  t.nonNull.field('maker', {
    type: makerType,
    args: {
      id: nonNull(intArg()),
    },
    resolve: async (_root, args, ctx) => {
      const maker = await ctx.prisma.maker.findUnique({
        where: { id: args.id },
      });

      if (!maker) {
        throw new Error('Not Found');
      }
      return maker;
    },
  });
});
