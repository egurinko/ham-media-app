import { stringArg, nonNull, mutationField } from 'nexus';
import { productTagGroupType } from '../types';
import Mercurius from 'mercurius';
import { judgeError } from '@/services/error/judge';

export const createProductTagGroupField = mutationField((t) => {
  t.nonNull.field('createProductTagGroup', {
    type: productTagGroupType,
    args: { name: nonNull(stringArg()) },
    resolve: async (_, args, ctx) => {
      try {
        return await ctx.prisma.productTagGroup.create({
          data: { name: args.name },
          include: { productTags: true },
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
