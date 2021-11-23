import { stringArg, nonNull, mutationField, intArg, arg } from 'nexus';
import { productType } from '../types';
import { uploadFile } from '@/services/fileUploader';

export const createProductField = mutationField((t) => {
  t.nonNull.field('createProduct', {
    type: productType,
    args: {
      makerId: nonNull(intArg()),
      name: nonNull(stringArg()),
      remark: nonNull(stringArg()),
      file: nonNull(arg({ type: 'Upload' })),
    },
    resolve: async (_, args, ctx) => {
      const file = await args.file;
      const stream = file.createReadStream();
      const url = await uploadFile(file.filename, stream);

      return ctx.prisma.product.create({
        data: {
          maker_id: args.makerId,
          name: args.name,
          remark: args.remark,
          url,
        },
      });
    },
  });
});
