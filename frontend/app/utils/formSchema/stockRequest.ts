import { z } from 'zod';
import type { ZodFormattedError } from 'zod';

export const FormSchema = z.object({
  id: z.coerce.number({
    invalid_type_error: '在庫リクエストを選択してください。',
  }),
  requestProducts: z
    .array(
      z.object({
        productId: z.coerce.number({
          invalid_type_error: '商品を選択してください。',
        }),
        count: z.coerce
          .number({
            invalid_type_error: '在庫数を選択してください。',
          })
          .min(1, '在庫数は1以上で入力してください。')
          .max(5, '在庫数は10以下で入力してください。'),
      }),
      {
        invalid_type_error: '商品を 1 つ以上追加してください。',
        required_error: '商品を 1 つ以上追加してください。',
      },
    )
    .min(1, '商品を 1 つ以上追加してください。'),
});

export type State = {
  errors?: ZodFormattedError<z.infer<typeof FormSchema>>;
  message: string;
};
