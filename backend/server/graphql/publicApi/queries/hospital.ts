import { queryField, nonNull, arg } from 'nexus';
import { hospitalType } from '../types';

export const hospital = queryField((t) => {
  t.nonNull.field('hospital', {
    type: hospitalType,
    args: {
      id: nonNull(arg({ type: 'BigInt' })),
    },
    resolve: async (_root, args, ctx) => {
      try {
        const hospital = await ctx.prisma.hospital.findUnique({
          where: {
            id: args.id,
          },
        });
        return hospital;
      } catch {
        throw Error('Not Found');
      }
    },
  });
});
