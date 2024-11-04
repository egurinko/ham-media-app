'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import {
  createHospital as createHospitalGraphQL,
  updateHospital as updateHospitalGraphQL,
} from '@/app/utils/api/internalApi/hospital';
import { setFlashMessage } from '@/app/utils/flashMessage';
import {
  ADMIN_HOSPIALS_DETAIL_PATH,
  ADMIN_HOSPIALS_PATH,
} from '@/utils/routes';

const FormSchema = z.object({
  id: z.coerce.number({ invalid_type_error: '病院を選択してください。' }),
  name: z
    .string({ invalid_type_error: '病院名を入力してください。' })
    .max(100, { message: '病院名は100文字以内で入力してください。' }),
  url: z.string().optional(),
  deleted: z.string({ invalid_type_error: '公開状態を入力してください。' }),
  internalMemo: z
    .string({ invalid_type_error: '内部メモを入力してください。' })
    .max(200, { message: '内部メモは200文字以内で入力してください。' }),
});

export type State = {
  errors?: {
    id?: string[];
    name?: string[];
    url?: string[];
    deleted?: string[];
    internalMemo?: string[];
  };
  message: string;
};

const CreateHospital = FormSchema.omit({ id: true });
export async function createHospital(_prevState: State, formData: FormData) {
  const validatedFields = CreateHospital.safeParse({
    name: formData.get('name'),
    url: formData.get('url'),
    deleted: formData.get('deleted'),
    internalMemo: formData.get('internalMemo'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: '病院の登録に失敗しました。エラーメッセージを確認してください。',
    };
  }

  const { name, url, deleted, internalMemo } = validatedFields.data;

  try {
    await createHospitalGraphQL({
      name,
      url,
      deleted: deleted === 'true',
      internal_memo: internalMemo,
    });
  } catch {
    return {
      message: '病院の登録に失敗しました。エラーメッセージを確認してください。',
    };
  }

  setFlashMessage({
    message: `病院: ${name}を作成しました。`,
    type: 'notice',
  });
  redirect(ADMIN_HOSPIALS_PATH);
}

const UpdateHospital = FormSchema.omit({});
export async function updateHospital(_prevState: State, formData: FormData) {
  const validatedFields = UpdateHospital.safeParse({
    id: formData.get('id'),
    name: formData.get('name'),
    url: formData.get('url'),
    deleted: formData.get('deleted'),
    internalMemo: formData.get('internalMemo'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message:
        '病院基本情報の更新に失敗しました。エラーメッセージを確認してください。',
    };
  }

  const { id, name, url, deleted, internalMemo } = validatedFields.data;

  try {
    await updateHospitalGraphQL({
      id,
      name,
      url: url || '',
      deleted: deleted === 'true',
      internalMemo: internalMemo,
    });
  } catch {
    return {
      message: '病院の更新に失敗しました。エラーメッセージを確認してください。',
    };
  }

  setFlashMessage({
    message: `病院: ${name}を更新しました。`,
    type: 'notice',
  });
  redirect(ADMIN_HOSPIALS_DETAIL_PATH(id));
}
