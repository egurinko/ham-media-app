'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { parseFormData } from 'parse-nested-form-data';
import { setFlashMessage } from '@/app/utils/flashMessage';
import { FormSchema } from '@/app/utils/formSchema/product';
import type { State } from '@/app/utils/formSchema/product';
import { ADMIN_PRODUCTS_PATH } from '@/utils/routes';
import { createProduct } from './page.api';

const CreateProduct = FormSchema.omit({ id: true });

export async function createProductAction(
  _prevState: State,
  formData: FormData,
) {
  const parsed = parseFormData(formData);
  const validatedFields = CreateProduct.safeParse({
    name: parsed.name,
    remark: parsed.remark,
    makerId: parsed.makerId,
    file: formData.get('file'),
    productTagIds: parsed.productTagIds,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: '商品の登録に失敗しました。エラーメッセージを確認してください。',
    };
  }

  const { name, remark, file, productTagIds, makerId } = validatedFields.data;
  try {
    await createProduct({
      name,
      remark,
      makerId,
      file,
      productTagIds: productTagIds.map((id) => Number(id)),
    });
  } catch {
    return {
      message: '商品の登録に失敗しました。エラーメッセージを確認してください。',
    };
  }

  const cookieStore = await cookies();
  setFlashMessage(cookieStore, {
    message: `商品: ${name}を作成しました。`,
    type: 'notice',
  });
  redirect(ADMIN_PRODUCTS_PATH);
}
