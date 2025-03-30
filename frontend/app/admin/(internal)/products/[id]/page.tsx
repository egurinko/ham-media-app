import { Suspense } from 'react';
import { Breadcrumbs } from '@/app/components/molecules/Breadcrumbs';
import { StockRequestCartButton } from '@/app/components/molecules/StockRequestCartButton';
import { AuthorizedButton } from '@/app/components/organisms/admin/authorizedButton/Index';
import { ProductAddCart } from '@/app/components/organisms/admin/productAddCart/Index';
import { ProductStocks } from '@/app/components/organisms/admin/productStocks/Index';
import { CardSkeleton } from '@/app/components/organisms/admin/skeletons/CardSkeleton';
import { css } from '@/styled/css';
import { ADMIN_PRODUCTS_EDIT_PATH, ADMIN_PRODUCTS_PATH } from '@/utils/routes';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: Props) {
  const productId = Number((await params).id);

  return (
    <div
      className={css({
        display: 'flex',
        flexDir: 'column',
        alignItems: 'flex-start',
        gap: 'lg',
      })}
    >
      <div
        className={css({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        })}
      >
        <Breadcrumbs
          breadcrumbs={[
            { title: '商品一覧', href: ADMIN_PRODUCTS_PATH },
            { title: '商品詳細' },
          ]}
        />
        <Suspense fallback={''}>
          <AuthorizedButton
            href={ADMIN_PRODUCTS_EDIT_PATH(productId)}
            label="編集する"
          />
        </Suspense>
      </div>

      <Suspense fallback={<CardSkeleton />}>
        <ProductAddCart productId={productId} />
      </Suspense>
      <Suspense fallback={<CardSkeleton />}>
        <ProductStocks productId={productId} />
      </Suspense>
      <StockRequestCartButton />
    </div>
  );
}
