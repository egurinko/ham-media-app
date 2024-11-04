import { z } from 'zod';
import type { FormStateBase } from '@/app/utils/formSchema/types';

export const FormSchema = z.object({
  hospitalId: z.coerce.number({
    invalid_type_error: '病院を選択してください。',
  }),
  star: z.coerce
    .number({
      invalid_type_error: '内部評価を選択してください。',
    })
    .min(1, { message: '内部評価を1以上で入力してください。' })
    .max(5, { message: '内部評価を5以下で入力してください。' }),
  remark: z
    .string({ invalid_type_error: '備考を入力してください。' })
    .max(255, { message: '備考は255文字以内で入力してください。' }),
});

export type FormSchema = z.infer<typeof FormSchema>;
export type FormState = FormStateBase<FormSchema>;
