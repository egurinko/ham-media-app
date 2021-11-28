import { stringArg, intArg, nonNull, mutationField } from 'nexus';
import { productTagGroupType } from '../types';

export const updateProductTagGroupField = mutationField((t) => {
  t.nonNull.field('updateProductTagGroup', {
    type: productTagGroupType,
    args: {
      id: nonNull(intArg()),
      name: nonNull(stringArg()),
    },
    resolve: async (_, args, ctx) => {
      return ctx.prisma.productTagGroup.update({
        data: {
          name: args.name,
        },
        where: {
          id: args.id,
        },
      });
    },
  });
});
