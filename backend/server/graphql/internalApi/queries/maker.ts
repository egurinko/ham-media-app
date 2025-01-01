import { queryField, nonNull, intArg } from 'nexus';
import { makerType } from '../types';
import Mercurius from 'mercurius';
import { judgeError } from '@/services/error/judge';

export const maker = queryField((t) => {
  t.nonNull.field('maker', {
    type: makerType,
    args: {
      id: nonNull(intArg()),
    },
    resolve: async (_root, args, ctx) => {
      try {
        return await ctx.prisma.maker.findUniqueOrThrow({
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
