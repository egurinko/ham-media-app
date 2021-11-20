import { stringArg, nonNull, mutationField, intArg } from 'nexus';
import { productType } from '../types';

export const createProductField = mutationField((t) => {
  t.nonNull.field('createProduct', {
    type: productType,
    args: {
      makerId: nonNull(intArg()),
      name: nonNull(stringArg()),
      remark: nonNull(stringArg()),
    },
    resolve: async (_, args, ctx) => {
      return ctx.prisma.product.create({
        data: { maker_id: args.makerId, name: args.name, remark: args.remark },
      });
    },
  });
});
