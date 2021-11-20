import { stringArg, intArg, nonNull, mutationField } from 'nexus';
import { productType } from '../types';

export const updateProductField = mutationField((t) => {
  t.nonNull.field('updateProduct', {
    type: productType,
    args: {
      id: nonNull(intArg()),
      makerId: nonNull(intArg()),
      name: nonNull(stringArg()),
      remark: nonNull(stringArg()),
    },
    resolve: async (_, args, ctx) => {
      return ctx.prisma.product.update({
        data: {
          name: args.name,
          remark: args.remark,
          maker_id: args.makerId,
        },
        where: {
          id: args.id,
        },
      });
    },
  });
});
