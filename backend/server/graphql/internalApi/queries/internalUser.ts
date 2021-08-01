import { queryField, nonNull, intArg } from 'nexus';
import { internalUserType } from '../types/internalUserType';

export const internalUser = queryField((t) => {
  t.nonNull.field('internalUser', {
    type: internalUserType,
    args: {
      id: nonNull(intArg()),
    },
    resolve: async (_root, args, ctx) => {
      const internalUser = await ctx.prisma.internalUser.findUnique({
        where: { id: args.id },
      });

      if (!internalUser) {
        throw new Error('Not Found');
      }
      return internalUser;
    },
  });
});
