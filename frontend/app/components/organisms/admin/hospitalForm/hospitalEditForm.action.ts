'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { setFlashMessage } from '@/app/utils/flashMessage';
import type { FormState } from '@/app/utils/formSchema/hospital';
import { FormSchema } from '@/app/utils/formSchema/hospital';
import { ADMIN_HOSPIALS_DETAIL_PATH } from '@/utils/routes';
import { updateHospital } from './hospitalEditForm.api';

const UpdateHospital = FormSchema.omit({});

export async function updateHospitalAction(
  _prevState: FormState,
  formData: FormData,
) {
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

  if (!id) {
    return {
      message: '病院の更新に失敗しました。エラーメッセージを確認してください。',
    };
  }

  try {
    await updateHospital({
      id,
      name,
      url: url || '',
      deleted: Boolean(deleted),
      internalMemo: internalMemo,
    });
  } catch {
    return {
      message: '病院の更新に失敗しました。エラーメッセージを確認してください。',
    };
  }

  const cookieStore = await cookies();
  setFlashMessage(cookieStore, {
    message: `病院: ${name}を更新しました。`,
    type: 'notice',
  });
  redirect(ADMIN_HOSPIALS_DETAIL_PATH(id));
}
