'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { setFlashMessage } from '@/app/utils/flashMessage';
import { FormSchema } from '@/app/utils/formSchema/productTagGroup';
import type { State } from '@/app/utils/formSchema/productTagGroup';
import { ADMIN_PRODUCT_TAG_GROUPS_PATH } from '@/utils/routes';
import { createProductTagGroup } from './page.api';

const CreateProductTagGroup = FormSchema.omit({ id: true });

export async function createProductTagGroupAction(
  _prevState: State,
  formData: FormData,
) {
  const validatedFields = CreateProductTagGroup.safeParse({
    name: formData.get('name'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message:
        'タグカテゴリーの登録に失敗しました。エラーメッセージを確認してください。',
    };
  }

  const { name } = validatedFields.data;

  try {
    await createProductTagGroup({
      name,
    });
  } catch {
    return {
      message:
        'タグカテゴリーの登録に失敗しました。エラーメッセージを確認してください。',
    };
  }

  const cookieStore = await cookies();
  setFlashMessage(cookieStore, {
    message: `タグカテゴリー: ${name}を作成しました。`,
    type: 'notice',
  });
  redirect(ADMIN_PRODUCT_TAG_GROUPS_PATH);
}
