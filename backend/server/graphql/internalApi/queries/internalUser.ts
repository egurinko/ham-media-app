import { queryField, nonNull, arg } from 'nexus';
import { internalUserType } from '../types/internalUserType';

export const internalUser = queryField((t) => {
  t.nonNull.field('internalUser', {
    type: internalUserType,
    args: {
      id: nonNull(arg({ type: 'BigInt' })),
    },
    resolve: async (_root, args, ctx) => {
      return await ctx.prisma.internalUser.findUniqueOrThrow({
        where: { id: args.id },
        include: { role: true, cart: true },
      });
    },
  });
});
