import { stringArg, intArg, nonNull, mutationField } from 'nexus';
import Mercurius from 'mercurius';
import { judgeError } from '@/services/error/judge';
import { makerType } from '../types';

export const updateMakerField = mutationField((t) => {
  t.nonNull.field('updateMaker', {
    type: makerType,
    args: {
      id: nonNull(intArg()),
      name: nonNull(stringArg()),
    },
    resolve: async (_, args, ctx) => {
      try {
        return await ctx.prisma.maker.update({
          data: {
            name: args.name,
          },
          where: {
            id: args.id,
          },
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
