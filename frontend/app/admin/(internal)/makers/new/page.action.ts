'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { setFlashMessage } from '@/app/utils/flashMessage';
import { FormSchema } from '@/app/utils/formSchema/maker';
import type { State } from '@/app/utils/formSchema/maker';
import { ADMIN_MAKERS_PATH } from '@/utils/routes';
import { createMaker } from './page.api';

const CreateMaker = FormSchema.omit({ id: true });

export async function createMakerAction(_prevState: State, formData: FormData) {
  const validatedFields = CreateMaker.safeParse({
    name: formData.get('name'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message:
        'メーカーの登録に失敗しました。エラーメッセージを確認してください。',
    };
  }

  const { name } = validatedFields.data;

  try {
    await createMaker({
      name,
    });
  } catch {
    return {
      message:
        'メーカーの登録に失敗しました。エラーメッセージを確認してください。',
    };
  }

  const cookieStore = await cookies();
  setFlashMessage(cookieStore, {
    message: `メーカー: ${name}を作成しました。`,
    type: 'notice',
  });
  redirect(ADMIN_MAKERS_PATH);
}
