'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { parseFormData } from 'parse-nested-form-data';
import { setFlashMessage } from '@/app/utils/flashMessage';
import { FormSchema } from '@/app/utils/formSchema/product';
import type { State } from '@/app/utils/formSchema/product';
import { ADMIN_PRODUCTS_DETAIL_PATH } from '@/utils/routes';
import { updateProduct } from './page.api';

const UpdateProduct = FormSchema.partial({ file: true });

export async function updateProductAction(
  _prevState: State,
  formData: FormData,
) {
  const parsed = parseFormData(formData);
  const formFile =
    (formData.get('file') as File).size === 0
      ? undefined
      : formData.get('file');
  const validatedFields = UpdateProduct.safeParse({
    id: parsed.id,
    name: parsed.name,
    remark: parsed.remark,
    makerId: parsed.makerId,
    file: formFile,
    productTagIds: parsed.productTagIds,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: '商品の編集に失敗しました。エラーメッセージを確認してください。',
    };
  }

  const { id, name, remark, file, productTagIds, makerId } =
    validatedFields.data;
  try {
    await updateProduct({
      id,
      name,
      remark,
      makerId,
      file,
      productTagIds: productTagIds.map((id) => Number(id)),
    });
  } catch {
    return {
      message: '商品の編集に失敗しました。エラーメッセージを確認してください。',
    };
  }

  const cookieStore = await cookies();
  setFlashMessage(cookieStore, {
    message: `商品: ${name}を編集しました。`,
    type: 'notice',
  });
  redirect(ADMIN_PRODUCTS_DETAIL_PATH(id));
}
