import { z } from 'zod';
import type { FormStateBase } from '@/app/utils/formSchema/types';

export const FormSchema = z.object({
  hospitalId: z.coerce.number({
    invalid_type_error: '病院を選択してください。',
  }),
  nichijuRegistered: z
    .string({ invalid_type_error: '日本獣医師会認定状況を入力してください。' })
    .max(4, { message: '日本獣医師会認定状況は4文字以内で入力してください。' }),
  jsavaRegistered: z
    .string({
      invalid_type_error:
        '日本小動物獣医師会(JSAVA)認定状況を入力してください。',
    })
    .max(4, {
      message:
        '日本小動物獣医師会(JSAVA)認定状況は4文字以内で入力してください。',
    }),
});

export type FormSchema = z.infer<typeof FormSchema>;
export type FormState = FormStateBase<FormSchema>;
