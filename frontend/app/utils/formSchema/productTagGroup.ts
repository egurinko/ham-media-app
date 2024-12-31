import { z } from 'zod';

export const FormSchema = z.object({
  id: z.coerce.number({
    invalid_type_error: 'タグカテゴリーを選択してください。',
  }),
  name: z
    .string({ invalid_type_error: 'タグカテゴリー名を入力してください。' })
    .max(30, { message: 'タグカテゴリー名は30文字以内で入力してください。' }),
});

export type State = {
  errors?: {
    id?: string[];
    name?: string[];
  };
  message: string;
};
