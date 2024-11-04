'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { setFlashMessage } from '@/app/utils/flashMessage';
import type { FormState } from '@/app/utils/formSchema/hospital';
import { FormSchema } from '@/app/utils/formSchema/hospital';
import {
  ADMIN_HOSPIALS_DETAIL_PATH,
  ADMIN_HOSPIALS_PATH,
} from '@/utils/routes';
import { createHospital } from './hospitalNewForm.api';

const CreateHospital = FormSchema.omit({ id: true });

export async function createHospitalAction(
  _prevState: FormState,
  formData: FormData,
) {
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

  let id: number | undefined = undefined;
  try {
    const result = await createHospital({
      name,
      url,
      deleted: deleted === 'true',
      internal_memo: internalMemo,
    });
    id = result.data?.createHospital.id;
  } catch {
    return {
      message: '病院の登録に失敗しました。エラーメッセージを確認してください。',
    };
  }

  const cookieStore = await cookies();
  setFlashMessage(cookieStore, {
    message: `病院: ${name}を作成しました。詳細情報を設定してから公開してください。`,
    type: 'notice',
  });
  if (id) {
    redirect(ADMIN_HOSPIALS_DETAIL_PATH(id));
  } else {
    redirect(ADMIN_HOSPIALS_PATH);
  }
}
