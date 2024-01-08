import { intArg, arg, nonNull, mutationField } from 'nexus';
import Mercurius from 'mercurius';
import { judgeError } from '@/services/error/judge';
import { cartType } from '../types';

export const updateCartField = mutationField((t) => {
  t.nonNull.field('updateCart', {
    type: cartType,
    args: {
      id: nonNull(intArg()),
      items: nonNull(arg({ type: 'JSONObject' })),
    },
    resolve: async (_, args, ctx) => {
      try {
        return await ctx.prisma.cart.update({
          data: {
            items: args.items,
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
