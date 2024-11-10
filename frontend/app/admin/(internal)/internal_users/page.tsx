import Link from 'next/link';
import { Suspense } from 'react';
import { Button } from '@/app/components/atoms/Button';
import { Typography } from '@/app/components/atoms/Typography';
import { FlashMessage } from '@/app/components/molecules/FlashMessage';
import { InternalUserList } from '@/app/components/organisms/admin/internalUserList/Index';
import { ListSkeleton } from '@/app/components/organisms/admin/skeletons/ListSkeleton';
import { css } from '@/styled/css';
import { ADMIN_INTERNAL_USERS_NEW_PATH } from '@/utils/routes';

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
          ユーザ一覧
        </Typography>
        <Link href={ADMIN_INTERNAL_USERS_NEW_PATH}>
          <Button visual="tonal">新規登録する</Button>
        </Link>
      </div>
      <Suspense fallback={<ListSkeleton />}>
        <InternalUserList />
      </Suspense>
    </div>
  );
}
