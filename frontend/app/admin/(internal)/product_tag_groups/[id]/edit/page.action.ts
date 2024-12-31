'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { setFlashMessage } from '@/app/utils/flashMessage';
import { FormSchema } from '@/app/utils/formSchema/productTagGroup';
import type { State } from '@/app/utils/formSchema/productTagGroup';
import { ADMIN_PRODUCT_TAG_GROUPS_EDIT_PATH } from '@/utils/routes';
import { updateProductTagGroup } from './page.api';

const UpdateProductTagGroup = FormSchema.omit({});

export async function updateProductTagGroupAction(
  _prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateProductTagGroup.safeParse({
    id: formData.get('id'),
    name: formData.get('name'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message:
        'タグカテゴリーの更新に失敗しました。エラーメッセージを確認してください。',
    };
  }

  const { id, name } = validatedFields.data;

  try {
    await updateProductTagGroup({
      id,
      name,
    });
  } catch {
    return {
      message:
        'タグカテゴリーの更新に失敗しました。エラーメッセージを確認してください。',
    };
  }

  const cookieStore = await cookies();
  setFlashMessage(cookieStore, {
    message: `タグカテゴリー: ${name}を更新しました。`,
    type: 'notice',
  });
  redirect(ADMIN_PRODUCT_TAG_GROUPS_EDIT_PATH(id));
}
