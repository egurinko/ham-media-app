'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { setFlashMessage } from '@/app/utils/flashMessage';
import { FormSchema } from '@/app/utils/formSchema/maker';
import type { State } from '@/app/utils/formSchema/maker';
import { ADMIN_MAKERS_PATH } from '@/utils/routes';
import { updateMaker } from './page.api';

const UpdateMaker = FormSchema.omit({});

export async function updateMakerAction(_prevState: State, formData: FormData) {
  const validatedFields = UpdateMaker.safeParse({
    id: formData.get('id'),
    name: formData.get('name'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message:
        'メーカーの更新に失敗しました。エラーメッセージを確認してください。',
    };
  }

  const { id, name } = validatedFields.data;

  try {
    await updateMaker({
      id,
      name,
    });
  } catch {
    return {
      message:
        'メーカーの更新に失敗しました。エラーメッセージを確認してください。',
    };
  }

  const cookieStore = await cookies();
  setFlashMessage(cookieStore, {
    message: `メーカー: ${name}を更新しました。`,
    type: 'notice',
  });
  redirect(ADMIN_MAKERS_PATH);
}
