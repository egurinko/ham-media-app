import { intArg, nonNull, queryField } from 'nexus';
import { productTagGroupType } from '../types';
import Mercurius from 'mercurius';
import { judgeError } from '@/services/error/judge';

export const productTagGroup = queryField((t) => {
  t.nonNull.field('productTagGroup', {
    type: productTagGroupType,
    args: {
      id: nonNull(intArg()),
    },
    resolve: async (_root, args, ctx) => {
      try {
        return await ctx.prisma.productTagGroup.findUniqueOrThrow({
          where: { id: args.id },
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
