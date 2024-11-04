'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { setFlashMessage } from '@/app/utils/flashMessage';
import { FormSchema } from '@/app/utils/formSchema/internalUser';
import type { State } from '@/app/utils/formSchema/internalUser';
import { ADMIN_INTERNAL_USERS_PATH } from '@/utils/routes';
import { createInternalUser } from './page.api';

const CreateInternalUser = FormSchema.omit({ id: true });

export async function createInternalUserAction(
  _prevState: State,
  formData: FormData,
) {
  const validatedFields = CreateInternalUser.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    discord_user_id: formData.get('discord_user_id'),
    roleId: formData.get('roleId'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message:
        'ユーザの登録に失敗しました。エラーメッセージを確認してください。',
    };
  }

  const { name, email, password, roleId, discord_user_id } =
    validatedFields.data;

  try {
    await createInternalUser({
      name,
      email,
      password,
      roleId,
      discord_user_id,
    });
  } catch {
    return {
      message:
        'ユーザの登録に失敗しました。エラーメッセージを確認してください。',
    };
  }

  const cookieStore = await cookies();
  setFlashMessage(cookieStore, {
    message: `ユーザ: ${name}を作成しました。`,
    type: 'notice',
  });
  redirect(ADMIN_INTERNAL_USERS_PATH);
}
