import { z } from 'zod';
import type { FormStateBase } from '@/app/utils/formSchema/types';

export const FormSchema = z.object({
  hospitalId: z.coerce.number({
    invalid_type_error: '病院を選択してください。',
  }),
  prefectureId: z.coerce.number({
    invalid_type_error: '都道府県を選択してください。',
  }),
  address: z
    .string({ invalid_type_error: '住所を入力してください。' })
    .max(100, { message: '住所は100文字以内で入力してください。' }),
  phoneNumber: z
    .string({ invalid_type_error: '電話番号を入力してください。' })
    .max(15, { message: '電話番号は15文字以内で入力してください。' }),
});

export type FormSchema = z.infer<typeof FormSchema>;
export type FormState = FormStateBase<FormSchema>;
