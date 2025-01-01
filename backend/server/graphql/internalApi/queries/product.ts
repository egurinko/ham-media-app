import { queryField, intArg, nonNull } from 'nexus';
import { productType } from '../types';
import Mercurius from 'mercurius';
import { judgeError } from '@/services/error/judge';

export const product = queryField((t) => {
  t.nonNull.field('product', {
    type: productType,
    args: { id: nonNull(intArg()) },
    resolve: async (_root, args, ctx) => {
      try {
        return await ctx.prisma.product.findUniqueOrThrow({
          where: { id: args.id },
          include: { maker: true, stocks: true },
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
