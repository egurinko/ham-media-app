import { stringArg, intArg, nonNull, mutationField } from 'nexus';
import { productTagGroupType } from '../types';
import Mercurius from 'mercurius';
import { judgeError } from '@/services/error/judge';

export const updateProductTagGroupField = mutationField((t) => {
  t.nonNull.field('updateProductTagGroup', {
    type: productTagGroupType,
    args: {
      id: nonNull(intArg()),
      name: nonNull(stringArg()),
    },
    resolve: async (_, args, ctx) => {
      try {
        return await ctx.prisma.productTagGroup.update({
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
