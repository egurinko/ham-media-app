import { queryField, nonNull, arg } from 'nexus';
import { hospitalType } from '../types';

export const hospital = queryField((t) => {
  t.nonNull.field('hospital', {
    type: hospitalType,
    args: {
      id: nonNull(arg({ type: 'BigInt' })),
    },
    resolve: async (_root, args, ctx) => {
      return await ctx.prisma.hospital.findFirstOrThrow({
        where: {
          id: args.id,
          deleted: false,
        },
      });
    },
  });
});
