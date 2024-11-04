import { z } from 'zod';
import type { FormStateBase } from '@/app/utils/formSchema/types';

export const FormSchema = z.object({
  hospitalId: z.coerce.number({
    invalid_type_error: '病院を選択してください。',
  }),
  businessHour: z
    .string({ invalid_type_error: '診療時間を入力してください。' })
    .max(255, { message: '診療時間は255文字以内で入力してください。' }),
  closedDay: z
    .string({ invalid_type_error: '休診日を入力してください。' })
    .max(255, { message: '休診日は255文字以内で入力してください。' }),
  insuranceEnabled: z
    .string({ invalid_type_error: '保険利用可否を入力してください。' })
    .max(4, { message: '保険利用可否は4文字以内で入力してください。' }),
  remark: z
    .string({ invalid_type_error: '備考を入力してください。' })
    .max(255, { message: '備考は255文字以内で入力してください。' }),
});

export type FormSchema = z.infer<typeof FormSchema>;
export type FormState = FormStateBase<FormSchema>;
