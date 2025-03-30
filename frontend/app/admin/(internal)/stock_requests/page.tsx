import Link from 'next/link';
import { Suspense } from 'react';
import { Button } from '@/app/components/atoms/Button';
import { Typography } from '@/app/components/atoms/Typography';
import { FlashMessage } from '@/app/components/molecules/FlashMessage';
import { ListSkeleton } from '@/app/components/organisms/admin/skeletons/ListSkeleton';
import { StockRequestList } from '@/app/components/organisms/admin/stockRequestList/Index';
import { StockRequestSearchSection } from '@/app/components/organisms/admin/stockRequestSearchSection/Index';
import { css } from '@/styled/css';
import { ADMIN_STOCK_REQUESTS_NEW_PATH } from '@/utils/routes';

type Props = {
  searchParams: SearchParams;
};

type SearchParams = Promise<{
  internalUserId?: string;
}>;

export default async function Page(props: Props) {
  const searchParams = await props.searchParams;
  const internalUserId = searchParams.internalUserId
    ? Number(searchParams.internalUserId)
    : undefined;

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
          在庫リクエスト一覧
        </Typography>
        <Link href={ADMIN_STOCK_REQUESTS_NEW_PATH}>
          <Button visual="tonal">カートを確認</Button>
        </Link>
      </div>
      <StockRequestSearchSection />
      <Suspense fallback={<ListSkeleton />}>
        <StockRequestList internalUserId={internalUserId} />
      </Suspense>
    </div>
  );
}
