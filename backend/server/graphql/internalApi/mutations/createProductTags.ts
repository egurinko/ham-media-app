import { nonNull, mutationField, intArg, list } from 'nexus';
import { batchPayloadType, productTagInputType } from '../types';
import Mercurius from 'mercurius';
import { judgeError } from '@/services/error/judge';

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

      try {
        return await ctx.prisma.productTag.createMany({
          data: productTags,
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
