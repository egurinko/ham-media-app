import { queryField, nonNull, arg } from 'nexus';
import { hospitalType } from '../types';

export const hospital = queryField((t) => {
  t.nonNull.field('hospital', {
    type: hospitalType,
    args: {
      id: nonNull(arg({ type: 'BigInt' })),
    },
    resolve: async (_root, args, ctx) => {
      const hospital = await ctx.prisma.hospital.findFirst({
        where: {
          id: args.id,
          deleted: false,
        },
      });

      if (!hospital) {
        throw Error('Not Found');
      }
      return hospital;
    },
  });
});
