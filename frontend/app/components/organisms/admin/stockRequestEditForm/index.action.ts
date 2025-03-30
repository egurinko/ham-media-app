'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { parseFormData } from 'parse-nested-form-data';
import { setFlashMessage } from '@/app/utils/flashMessage';
import type { State } from '@/app/utils/formSchema/stockRequest';
import { FormSchema } from '@/app/utils/formSchema/stockRequest';
import { ADMIN_STOCK_REQUESTS_PATH } from '@/utils/routes';
import { updateStockRequest } from './index.api';

const UpdateStockRequestTags = FormSchema;

export async function updateStockRequestAction(
  _prevState: State,
  formData: FormData,
): Promise<State> {
  const parsed = parseFormData(formData);
  const validatedFields = UpdateStockRequestTags.safeParse({
    id: parsed.id,
    requestProducts: parsed.requestProducts,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.format(),
      message:
        '在庫リクエストの更新に失敗しました。エラーメッセージを確認してください。',
    };
  }

  const { requestProducts, id } = validatedFields.data;

  try {
    await updateStockRequest({
      id,
      requestProducts,
    });
  } catch {
    return {
      message:
        '在庫リクエストの更新に失敗しました。エラーメッセージを確認してください。',
    };
  }

  const cookieStore = await cookies();
  setFlashMessage(cookieStore, {
    message: `在庫リクエストの更新をしました。`,
    type: 'notice',
  });
  redirect(ADMIN_STOCK_REQUESTS_PATH);
}
