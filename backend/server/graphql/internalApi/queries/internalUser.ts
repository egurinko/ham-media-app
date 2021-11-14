import { queryField, nonNull, arg } from 'nexus';
import { internalUserType } from '../types/internalUserType';

export const internalUser = queryField((t) => {
  t.nonNull.field('internalUser', {
    type: internalUserType,
    args: {
      id: nonNull(arg({ type: 'BigInt' })),
    },
    resolve: async (_root, args, ctx) => {
      const internalUser = await ctx.prisma.internalUser.findUnique({
        where: { id: args.id },
        include: { role: true },
      });

      if (!internalUser) {
        throw new Error('Not Found');
      }
      return internalUser;
    },
  });
});
