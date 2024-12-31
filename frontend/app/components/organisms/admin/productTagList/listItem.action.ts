'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { setFlashMessage } from '@/app/utils/flashMessage';
import type { FormState } from '@/app/utils/formSchema/hospital';
import { FormSchema } from '@/app/utils/formSchema/productTag';
import { ADMIN_PRODUCT_TAG_GROUPS_EDIT_PATH } from '@/utils/routes';
import { deleteProductTag, updateProductTag } from './listItem.api';

export async function deleteProductTagAction(
  id: number,
  productTagGroupId: number,
) {
  await deleteProductTag({ id });
  const cookieStore = await cookies();
  setFlashMessage(cookieStore, {
    message: `タグを削除しました。`,
    type: 'notice',
  });
  redirect(ADMIN_PRODUCT_TAG_GROUPS_EDIT_PATH(productTagGroupId));
}

const UpdateProductTag = FormSchema.omit({});

export async function updateProductTagAction(
  _prevState: FormState,
  formData: FormData,
) {
  const validatedFields = UpdateProductTag.safeParse({
    id: formData.get('id'),
    name: formData.get('name'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: '更新に失敗しました。エラーメッセージを確認してください。',
    };
  }

  const { id, name } = validatedFields.data;
  const productTagGroupId = formData.get('productTagGroupId');

  try {
    await updateProductTag({ id, name });
  } catch {
    return {
      message: 'タグの更新に失敗しました。エラーメッセージを確認してください。',
    };
  }

  const cookieStore = await cookies();
  setFlashMessage(cookieStore, {
    message: `${name}に更新しました。`,
    type: 'notice',
  });
  redirect(ADMIN_PRODUCT_TAG_GROUPS_EDIT_PATH(Number(productTagGroupId)));
}
