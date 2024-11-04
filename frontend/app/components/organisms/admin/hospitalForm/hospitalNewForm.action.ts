'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { setFlashMessage } from '@/app/utils/flashMessage';
import type { FormState } from '@/app/utils/formSchema/hospital';
import { FormSchema } from '@/app/utils/formSchema/hospital';
import { ADMIN_HOSPIALS_PATH } from '@/utils/routes';
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

  console.log('DELETED: ', formData.get('deleted'));

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: '病院の登録に失敗しました。エラーメッセージを確認してください。',
    };
  }

  const { name, url, deleted, internalMemo } = validatedFields.data;

  try {
    await createHospital({
      name,
      url,
      deleted: Boolean(deleted),
      internal_memo: internalMemo,
    });
  } catch {
    return {
      message: '病院の登録に失敗しました。エラーメッセージを確認してください。',
    };
  }

  const cookieStore = await cookies();
  setFlashMessage(cookieStore, {
    message: `病院: ${name}を作成しました。`,
    type: 'notice',
  });
  redirect(ADMIN_HOSPIALS_PATH);
}
