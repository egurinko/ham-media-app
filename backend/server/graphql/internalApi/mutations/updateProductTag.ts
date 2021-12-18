import { stringArg, intArg, nonNull, mutationField } from 'nexus';
import { productTagType } from '../types';

export const updateProductTagField = mutationField((t) => {
  t.nonNull.field('updateProductTag', {
    type: productTagType,
    args: {
      id: nonNull(intArg()),
      name: nonNull(stringArg()),
    },
    resolve: async (_, args, ctx) => {
      return ctx.prisma.productTag.update({
        where: { id: args.id },
        data: { name: args.name },
      });
    },
  });
});
