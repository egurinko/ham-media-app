import { z } from 'zod';

export const FormSchema = z.object({
  id: z.coerce.number({ invalid_type_error: 'ユーザを選択してください。' }),
  name: z
    .string({ invalid_type_error: 'ユーザ名を入力してください。' })
    .max(30, { message: 'ユーザ名は30文字以内で入力してください。' }),
  email: z
    .string({ invalid_type_error: 'メールアドレスを入力してください。' })
    .email({ message: 'メールアドレスの形式で入力してください。' }),
  password: z
    .string({ invalid_type_error: 'パスワードを入力してください。' })
    .min(12, { message: 'パスワードは12文字以上で入力してください。' }),
  discord_user_id: z
    .string({ invalid_type_error: 'discord user id を入力してください。' })
    .max(19, { message: 'discord user id は19文字以内で入力してください。' })
    .min(18, { message: 'discord user id は18文字以上で入力してください。' }),
  roleId: z.coerce.number({
    invalid_type_error: 'ロールを入力してください。',
  }),
});

export type State = {
  errors?: {
    id?: string[];
    name?: string[];
    email?: string[];
    password?: string[];
    discord_user_id?: string[];
    roleId?: string[];
  };
  message: string;
};
