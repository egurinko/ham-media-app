'use server';

import { redirect } from 'next/navigation';
import { setFlashMessage } from '@/app/utils/flashMessage';
import { FormSchema } from '@/app/utils/formSchema/internalUser';
import type { State } from '@/app/utils/formSchema/internalUser';
import { ADMIN_INTERNAL_USERS_PATH } from '@/utils/routes';
import { updateInternalUser } from './page.api';

const UpdateInternalUser = FormSchema.omit({});

export async function updateInternalUserAction(
  _prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateInternalUser.safeParse({
    id: formData.get('id'),
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
        'ユーザの更新に失敗しました。エラーメッセージを確認してください。',
    };
  }

  const { id, name, email, password, roleId, discord_user_id } =
    validatedFields.data;

  try {
    await updateInternalUser({
      id,
      name,
      email,
      password,
      roleId,
      discord_user_id,
    });
  } catch {
    return {
      message:
        'ユーザの更新に失敗しました。エラーメッセージを確認してください。',
    };
  }

  setFlashMessage({
    message: `ユーザ: ${name}を更新しました。`,
    type: 'notice',
  });
  redirect(ADMIN_INTERNAL_USERS_PATH);
}
