'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { parseFormData } from 'parse-nested-form-data';
import { setFlashMessage } from '@/app/utils/flashMessage';
import { FormSchema } from '@/app/utils/formSchema/productTags';
import type { State } from '@/app/utils/formSchema/productTags';
import { ADMIN_PRODUCT_TAG_GROUPS_EDIT_PATH } from '@/utils/routes';
import { createProductTags } from './index.api';

const CreateProductTags = FormSchema;

export async function createProductTagsAction(
  _prevState: State,
  formData: FormData,
): Promise<State> {
  const parsed = parseFormData(formData);
  const validatedFields = CreateProductTags.safeParse({
    productTagGroupId: parsed.productTagGroupId,
    productTags: parsed.productTags,
  });

  if (!validatedFields.success) {
    const error = validatedFields.error.format();
    return {
      errors: error,
      message: 'タグの登録に失敗しました。エラーメッセージを確認してください。',
    };
  }

  const { productTagGroupId, productTags } = validatedFields.data;

  try {
    await createProductTags({
      productTagGroupId,
      productTags,
    });
  } catch {
    return {
      message: 'タグの登録に失敗しました。エラーメッセージを確認してください。',
    };
  }

  const cookieStore = await cookies();
  setFlashMessage(cookieStore, {
    message: `タグを作成しました。`,
    type: 'notice',
  });
  redirect(ADMIN_PRODUCT_TAG_GROUPS_EDIT_PATH(productTagGroupId));
}
