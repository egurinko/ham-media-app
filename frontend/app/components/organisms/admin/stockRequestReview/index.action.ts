'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { parseFormData } from 'parse-nested-form-data';
import { setFlashMessage } from '@/app/utils/flashMessage';
import type { State } from '@/app/utils/formSchema/stockRequestReview';
import { FormSchema } from '@/app/utils/formSchema/stockRequestReview';
import { ADMIN_STOCK_REQUESTS_PATH } from '@/utils/routes';
import { approveStockRequest, rejectStockRequest } from './index.api';

const ApproveStockRequest = FormSchema;

export async function approveStockRequestAction(
  _prevState: State,
  formData: FormData,
): Promise<State> {
  const parsed = parseFormData(formData);
  const validatedFields = ApproveStockRequest.safeParse({
    id: parsed.id,
    message: parsed.message,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.format(),
      message:
        '在庫リクエストの承認に失敗しました。エラーメッセージを確認してください。',
    };
  }

  const { message, id } = validatedFields.data;

  try {
    await approveStockRequest({
      id,
      message,
    });
  } catch {
    return {
      message:
        '在庫リクエストの承認に失敗しました。エラーメッセージを確認してください。',
    };
  }

  const cookieStore = await cookies();
  setFlashMessage(cookieStore, {
    message: `在庫リクエストの承認をしました。`,
    type: 'notice',
  });
  redirect(ADMIN_STOCK_REQUESTS_PATH);
}

const RejectStockRequest = FormSchema;

export async function rejectStockRequestAction(
  _prevState: State,
  formData: FormData,
): Promise<State> {
  const parsed = parseFormData(formData);
  const validatedFields = RejectStockRequest.safeParse({
    id: parsed.id,
    message: parsed.message,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.format(),
      message:
        '在庫リクエストの棄却に失敗しました。エラーメッセージを確認してください。',
    };
  }

  const { message, id } = validatedFields.data;

  try {
    await rejectStockRequest({
      id,
      message,
    });
  } catch {
    return {
      message:
        '在庫リクエストの棄却に失敗しました。エラーメッセージを確認してください。',
    };
  }

  const cookieStore = await cookies();
  setFlashMessage(cookieStore, {
    message: `在庫リクエストの棄却をしました。`,
    type: 'notice',
  });
  redirect(ADMIN_STOCK_REQUESTS_PATH);
}
