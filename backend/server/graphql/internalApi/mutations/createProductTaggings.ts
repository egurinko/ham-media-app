import { nonNull, mutationField, intArg, list } from 'nexus';
import { productType } from '../types';

export const createProductTaggingsField = mutationField((t) => {
  t.nonNull.field('createProductTaggings', {
    type: productType,
    args: {
      productId: nonNull(intArg()),
      productTagIds: nonNull(list(nonNull(intArg()))),
    },
    resolve: async (_, args, ctx) => {
      const productTaggings = args.productTagIds.map((productTagId) => ({
        product_tag_id: productTagId,
      }));
      return await ctx.prisma.product.update({
        where: { id: args.productId },
        data: {
          productTaggings: {
            createMany: {
              data: productTaggings,
            },
          },
        },
      });
    },
  });
});
