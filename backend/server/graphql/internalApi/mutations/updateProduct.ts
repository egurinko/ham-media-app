import { stringArg, intArg, nonNull, mutationField, arg, list } from 'nexus';
import Mercurius from 'mercurius';
import { judgeError } from '@/services/error/judge';
import { productType } from '../types';
import { uploadFile } from '@/services/fileUploader';

export const updateProductField = mutationField((t) => {
  t.nonNull.field('updateProduct', {
    type: productType,
    args: {
      id: nonNull(intArg()),
      makerId: nonNull(intArg()),
      name: nonNull(stringArg()),
      remark: nonNull(stringArg()),
      file: arg({ type: 'Upload' }),
      productTagIds: nonNull(list(nonNull(intArg()))),
    },
    resolve: async (_, args, ctx) => {
      let url: string | undefined;
      if (args.file) {
        const file = await args.file;
        const stream = file.createReadStream();
        url = await uploadFile(file.filename, stream);
      }

      try {
        const [_, product] = await ctx.prisma.$transaction([
          ctx.prisma.productTagging.deleteMany({
            where: { product_id: args.id },
          }),
          ctx.prisma.product.update({
            data: {
              name: args.name,
              remark: args.remark,
              maker_id: args.makerId,
              url,
              productTaggings: {
                createMany: {
                  data: args.productTagIds.map((id) => ({
                    product_tag_id: id,
                  })),
                },
              },
            },
            where: {
              id: args.id,
            },
          }),
        ]);
        return product;
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
