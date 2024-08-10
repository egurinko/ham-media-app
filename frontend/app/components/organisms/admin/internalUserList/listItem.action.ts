import { redirect } from 'next/navigation';
import { setFlashMessage } from '@/app/utils/flashMessage';
import { ADMIN_INTERNAL_USERS_PATH } from '@/utils/routes';
import { deleteInternalUser } from './listItem.api';

export async function deleteInternalUserAction(id: number) {
  await deleteInternalUser({ id });
  setFlashMessage({
    message: `ユーザを削除しました。`,
    type: 'notice',
  });
  redirect(ADMIN_INTERNAL_USERS_PATH);
}
