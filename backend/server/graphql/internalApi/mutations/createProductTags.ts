import { nonNull, mutationField, intArg, list } from 'nexus';
import { batchPayloadType, productTagInputType } from '../types';

export const createProductTagsField = mutationField((t) => {
  t.nonNull.field('createProductTags', {
    type: batchPayloadType,
    args: {
      productTagGroupId: nonNull(intArg()),
      productTags: nonNull(list(nonNull(productTagInputType))),
    },
    resolve: async (_, args, ctx) => {
      const productTags = args.productTags.map((productTag) => ({
        product_tag_group_id: args.productTagGroupId,
        name: productTag.name,
      }));
      return await ctx.prisma.productTag.createMany({
        data: productTags,
      });
    },
  });
});
