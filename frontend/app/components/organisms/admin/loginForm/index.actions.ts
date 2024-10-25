'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { HAMEDIA_SESSION } from '@/app/utils/constant';
import { ADMIN_PRODUCTS_PATH } from '@/utils/routes';
import { createSession as createSessionGraphQL } from './index.api';

const FormSchema = z.object({
  email: z
    .string({ invalid_type_error: 'メールアドレスを入力してください。' })
    .email('妥当なメールアドレスを入力してください。'),
  password: z
    .string({ invalid_type_error: 'パスワードを入力してください。' })
    .min(8, { message: 'パスワードは8文字以上で入力してください。' }),
});

export type State = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};

export async function createSessionAction(
  _prevState: State,
  formData: FormData,
) {
  const validatedFields = FormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'メールアドレスまたはパスワードが違います。',
    };
  }

  const { email, password } = validatedFields.data;

  try {
    const { data } = await createSessionGraphQL({ email, password });
    if (data) {
      const oneMonth = 30 * 24 * 60 * 60 * 1000;
      (await cookies()).set(HAMEDIA_SESSION, data.createSession.token, {
        expires: Date.now() + oneMonth,
      });
    }
  } catch (e) {
    return {
      message: 'メールアドレスまたはパスワードが違います。',
    };
  }

  redirect(ADMIN_PRODUCTS_PATH);
}
