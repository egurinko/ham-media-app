import { z } from 'zod';
import type { FormStateBase } from '@/app/utils/formSchema/types';

export const FormSchema = z.object({
  id: z.coerce
    .number({ invalid_type_error: '病院を選択してください。' })
    .optional(),
  name: z
    .string({ invalid_type_error: '病院名を入力してください。' })
    .max(100, { message: '病院名は100文字以内で入力してください。' }),
  url: z.string().optional(),
  deleted: z.union([z.literal('true'), z.literal('false')], {
    invalid_type_error: '公開を入力してください。',
  }),
  internalMemo: z
    .string({ invalid_type_error: '内部メモを入力してください。' })
    .max(200, { message: '内部メモは200文字以内で入力してください。' }),
});

export type FormSchema = z.infer<typeof FormSchema>;
export type FormState = FormStateBase<FormSchema>;
