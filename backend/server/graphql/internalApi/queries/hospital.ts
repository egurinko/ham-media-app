import { queryField, nonNull, arg } from 'nexus';
import { hospitalType } from '../types';
import Mercurius from 'mercurius';
import { judgeError } from '@/services/error/judge';

export const hospital = queryField((t) => {
  t.nonNull.field('hospital', {
    type: hospitalType,
    args: {
      id: nonNull(arg({ type: 'BigInt' })),
    },
    resolve: async (_root, args, ctx) => {
      try {
        return await ctx.prisma.hospital.findUniqueOrThrow({
          where: { id: args.id },
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
