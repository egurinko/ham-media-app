import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { setFlashMessage } from '@/app/utils/flashMessage';
import { ADMIN_MAKERS_PATH } from '@/utils/routes';
import { deleteMaker } from './listItem.api';

export async function deleteMakerAction(id: number) {
  await deleteMaker({ id });
  const cookieStore = await cookies();
  setFlashMessage(cookieStore, {
    message: `メーカーを削除しました。`,
    type: 'notice',
  });
  redirect(ADMIN_MAKERS_PATH);
}
