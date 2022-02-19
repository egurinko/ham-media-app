import { stringArg, nonNull, mutationField, intArg, arg, list } from 'nexus';
import Mercurius from 'mercurius';
import { productType } from '../types';
import { uploadFile } from '@/services/fileUploader';
import { judgeError } from '@/services/error/judge';

export const createProductField = mutationField((t) => {
  t.nonNull.field('createProduct', {
    type: productType,
    args: {
      makerId: nonNull(intArg()),
      name: nonNull(stringArg()),
      remark: nonNull(stringArg()),
      file: nonNull(arg({ type: 'Upload' })),
      productTagIds: nonNull(list(nonNull(intArg()))),
    },
    resolve: async (_, args, ctx) => {
      const file = await args.file;
      const stream = file.createReadStream();
      const url = await uploadFile(file.filename, stream);

      try {
        return await ctx.prisma.product.create({
          data: {
            maker_id: args.makerId,
            name: args.name,
            remark: args.remark,
            url,
            productTaggings: {
              createMany: {
                data: args.productTagIds.map((id) => ({ product_tag_id: id })),
              },
            },
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
