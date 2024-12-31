import { z } from 'zod';
import type { ZodFormattedError } from 'zod';

export const FormSchema = z.object({
  productTagGroupId: z.coerce.number({
    invalid_type_error: 'タグカテゴリーを選択してください。',
  }),
  productTags: z.array(
    z.object({
      name: z
        .string({
          invalid_type_error: 'タグ名は文字で入力してください。',
        })
        .max(30, 'タグ名は30字以内で入力してください。'),
    }),
  ),
});

export type State = {
  errors?: ZodFormattedError<
    {
      productTagGroupId: number;
      productTags: {
        name: string;
      }[];
    },
    string
  >;
  message: string;
};
