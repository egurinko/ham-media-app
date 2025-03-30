import { Suspense } from 'react';
import { Typography } from '@/app/components/atoms/Typography';
import { FlashMessage } from '@/app/components/molecules/FlashMessage';
import { StockRequestCartButton } from '@/app/components/molecules/StockRequestCartButton';
import { AuthorizedButton } from '@/app/components/organisms/admin/authorizedButton/Index';
import { ProductList } from '@/app/components/organisms/admin/productList/Index';
import { ProductSearchSection } from '@/app/components/organisms/admin/productSearchSection/Index';
import { ListSkeleton } from '@/app/components/organisms/admin/skeletons/ListSkeleton';
import { css } from '@/styled/css';
import { ADMIN_PRODUCTS_NEW_PATH } from '@/utils/routes';

type Props = {
  searchParams: SearchParams;
};

type SearchParams = Promise<{
  name?: string;
  makerId?: string;
  productTagId?: string;
  allocatedInternalUserId?: string;
  chargedInternalUserId?: string;
  hasStock?: string;
}>;

export default async function Page(props: Props) {
  const searchParams = await props.searchParams;
  const name = searchParams.name || '';
  const makerId = searchParams.makerId
    ? Number(searchParams.makerId)
    : undefined;
  const productTagId = searchParams.productTagId
    ? Number(searchParams.productTagId)
    : undefined;
  const allocatedInternalUserId = searchParams.allocatedInternalUserId
    ? Number(searchParams.allocatedInternalUserId)
    : undefined;
  const chargedInternalUserId = searchParams.chargedInternalUserId
    ? Number(searchParams.chargedInternalUserId)
    : undefined;
  const hasStock = searchParams.hasStock || 'has';

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
          商品一覧
        </Typography>
        <Suspense fallback={''}>
          <AuthorizedButton
            href={ADMIN_PRODUCTS_NEW_PATH}
            label="新規登録する"
          />
        </Suspense>
      </div>
      <ProductSearchSection />
      <Suspense fallback={<ListSkeleton />}>
        <ProductList
          name={name}
          makerId={makerId}
          productTagId={productTagId}
          allocatedInternalUserId={allocatedInternalUserId}
          internalUserId={chargedInternalUserId}
          hasStock={hasStock}
        />
      </Suspense>
      <StockRequestCartButton />
    </div>
  );
}
