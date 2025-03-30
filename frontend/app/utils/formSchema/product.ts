import { z } from 'zod';

const IMAGE_TYPES = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];
const MAX_IMAGE_SIZE = 5; // 5MB
// バイト単位のサイズをメガバイト単位に変換する
const sizeInMB = (sizeInBytes: number, decimalsNum = 2) => {
  const result = sizeInBytes / (1024 * 1024);
  return +result.toFixed(decimalsNum);
};

export const FormSchema = z.object({
  id: z.coerce.number({ invalid_type_error: '商品を選択してください。' }),
  name: z
    .string({ invalid_type_error: '商品名を入力してください。' })
    .max(30, { message: '商品名は30文字以内で入力してください。' }),
  makerId: z.coerce.number({
    invalid_type_error: 'メーカーを選択してください。',
  }),
  remark: z
    .string({ invalid_type_error: '備考を入力してください。' })
    .max(255, { message: '備考は255文字以内で入力してください。' }),
  file: z
    // z.inferでSchemaを定義したときに型がつくようにするため
    .custom<File>()
    // 必須にしたい場合
    .refine((file) => !!file, { message: 'イメージは必須です。' })
    // ファイルサイズを制限したい場合
    .refine((file) => sizeInMB(file.size) <= MAX_IMAGE_SIZE, {
      message: 'ファイルサイズは最大5MBです',
    })
    // 画像形式を制限したい場合
    .refine((file) => IMAGE_TYPES.includes(file.type), {
      message: 'jpg/jpeg/png/gif のみ可能です',
    }),
  productTagIds: z.string().array(),
});

export type State = {
  errors?: {
    id?: string[];
    name?: string[];
    makerId?: string[];
    remark?: string[];
    file?: string[];
    productTagIds?: string[];
  };
  message: string;
};
