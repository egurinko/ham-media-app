import { stringArg, nonNull, mutationField } from 'nexus';
import Mercurius from 'mercurius';
import { judgeError } from '@/services/error/judge';
import { makerType } from '../types';

export const createMakerField = mutationField((t) => {
  t.nonNull.field('createMaker', {
    type: makerType,
    args: { name: nonNull(stringArg()) },
    resolve: async (_, args, ctx) => {
      try {
        return await ctx.prisma.maker.create({ data: { name: args.name } });
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
