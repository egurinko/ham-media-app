import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { setFlashMessage } from '@/app/utils/flashMessage';
import { ADMIN_STOCK_REQUESTS_PATH } from '@/utils/routes';
import { deleteStockRequest } from './index.api';

export async function deleteStockRequestAction(id: number) {
  await deleteStockRequest({ id });
  const cookieStore = await cookies();
  setFlashMessage(cookieStore, {
    message: `在庫リクエストを削除しました。`,
    type: 'notice',
  });
  redirect(ADMIN_STOCK_REQUESTS_PATH);
}
