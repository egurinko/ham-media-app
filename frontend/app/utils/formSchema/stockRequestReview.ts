import { z } from 'zod';
import type { ZodFormattedError } from 'zod';

export const FormSchema = z.object({
  id: z.coerce.number({
    invalid_type_error: '在庫リクエストを選択してください。',
  }),
  message: z
    .string({ invalid_type_error: 'メッセージを入力してください。' })
    .max(100, { message: 'メッセージは100文字以内で入力してください。' }),
});

export type State = {
  errors?: ZodFormattedError<z.infer<typeof FormSchema>>;
  message: string;
};
