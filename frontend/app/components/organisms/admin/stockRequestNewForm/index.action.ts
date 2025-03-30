'use server';

import { parseFormData } from 'parse-nested-form-data';
import type { State } from '@/app/utils/formSchema/stockRequest';
import { FormSchema } from '@/app/utils/formSchema/stockRequest';
import { getProductsByIds, createStockRequest } from './index.api';
import type { GetProductsByIdsQueryVariables } from './index.api.generated';

export async function getProductsByIdsAction(
  variables: GetProductsByIdsQueryVariables,
) {
  return await getProductsByIds(variables);
}

const CreateStockRequestTags = FormSchema.omit({ id: true });

export async function createStockRequestAction(
  _prevState: State,
  formData: FormData,
): Promise<State> {
  const parsed = parseFormData(formData);
  const validatedFields = CreateStockRequestTags.safeParse({
    requestProducts: parsed.requestProducts,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.format(),
      message:
        '在庫リクエストに失敗しました。エラーメッセージを確認してください。',
    };
  }

  const { requestProducts } = validatedFields.data;

  try {
    await createStockRequest({
      requestProducts,
    });
  } catch {
    return {
      message:
        '在庫リクエストに失敗しました。エラーメッセージを確認してください。',
    };
  }
  return {
    message: '在庫リクエストをしました。',
  };
}
