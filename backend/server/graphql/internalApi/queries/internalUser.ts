import { queryField, nonNull, arg } from 'nexus';
import { internalUserType } from '../types/internalUserType';
import Mercurius from 'mercurius';
import { judgeError } from '@/services/error/judge';

export const internalUser = queryField((t) => {
  t.nonNull.field('internalUser', {
    type: internalUserType,
    args: {
      id: nonNull(arg({ type: 'BigInt' })),
    },
    resolve: async (_root, args, ctx) => {
      try {
        return await ctx.prisma.internalUser.findUniqueOrThrow({
          where: { id: args.id },
          include: { role: true, cart: true },
        });
      } catch (e) {
        const { key, message, statusCode } = judgeError(e);
        throw new Mercurius.ErrorWithProps(message, {
          key,
          message,
          statusCode,
        });
      }
    },
  });
});
