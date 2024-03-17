'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import {
  createInternalUser as createInternalUserGraphQL,
  deleteInternalUser as deleteInternalUserGraphQL,
  updateInternalUser as updateInternalUserGraphQL,
} from '@/app/utils/api/internalApi/internalUser';
import { setFlashMessage } from '@/app/utils/flashMessage';
import { ADMIN_INTERNAL_USERS_PATH } from '@/utils/routes';

const FormSchema = z.object({
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

const CreateInternalUser = FormSchema.omit({ id: true });
export async function createInternalUser(
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
    await createInternalUserGraphQL({
      name,
      email,
      password,
      roleId,
      discord_user_id,
    });
  } catch (e) {
    return {
      message:
        'ユーザの登録に失敗しました。エラーメッセージを確認してください。',
    };
  }

  setFlashMessage({
    message: `ユーザ: ${name}を作成しました。`,
    type: 'notice',
  });
  redirect(ADMIN_INTERNAL_USERS_PATH);
}

const UpdateInternalUser = FormSchema.omit({});
export async function updateInternalUser(
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
    await updateInternalUserGraphQL({
      id,
      name,
      email,
      password,
      roleId,
      discord_user_id,
    });
  } catch (e) {
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

export async function deleteInternalUser(id: number) {
  await deleteInternalUserGraphQL({ id });
  setFlashMessage({
    message: `ユーザを削除しました。`,
    type: 'notice',
  });
  redirect(ADMIN_INTERNAL_USERS_PATH);
}
