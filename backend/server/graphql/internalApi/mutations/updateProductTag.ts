import { stringArg, intArg, nonNull, mutationField } from 'nexus';
import { productTagType } from '../types';
import Mercurius from 'mercurius';
import { judgeError } from '@/services/error/judge';

export const updateProductTagField = mutationField((t) => {
  t.nonNull.field('updateProductTag', {
    type: productTagType,
    args: {
      id: nonNull(intArg()),
      name: nonNull(stringArg()),
    },
    resolve: async (_, args, ctx) => {
      try {
        return await ctx.prisma.productTag.update({
          where: { id: args.id },
          data: { name: args.name },
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
