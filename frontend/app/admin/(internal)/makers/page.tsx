import { Suspense } from 'react';
import { Typography } from '@/app/components/atoms/Typography';
import { FlashMessage } from '@/app/components/molecules/FlashMessage';
import { AuthorizedButton } from '@/app/components/organisms/admin/authorizedButton/Index';
import { MakerList } from '@/app/components/organisms/admin/makerList/Index';
import { ListSkeleton } from '@/app/components/organisms/admin/skeletons/ListSkeleton';
import { css } from '@/styled/css';
import { ADMIN_MAKERS_NEW_PATH } from '@/utils/routes';

export default async function Page() {
  return (
    <div
      className={css({
        display: 'flex',
        flexDir: 'column',
        alignItems: 'flex-start',
        gap: 'lg',
      })}
    >
      <FlashMessage />
      <div
        className={css({
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        })}
      >
        <Typography variant="subhead" bold={true}>
          メーカー一覧
        </Typography>
        <Suspense fallback={''}>
          <AuthorizedButton href={ADMIN_MAKERS_NEW_PATH} label="新規登録する" />
        </Suspense>
      </div>
      <Suspense fallback={<ListSkeleton />}>
        <MakerList />
      </Suspense>
    </div>
  );
}
