import { Typography } from '@/app/components/atoms/Typography';
import { Breadcrumbs } from '@/app/components/molecules/Breadcrumbs';
import { ProductForm } from '@/app/components/organisms/admin/productForm/Index';
import { css } from '@/styled/css';
import { flex } from '@/styled/patterns';
import {
  ADMIN_PRODUCTS_PATH,
  ADMIN_PRODUCTS_DETAIL_PATH,
} from '@/utils/routes';
import { updateProductAction } from './page.action';
import { getProductEditMaster } from './page.api';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: Props) {
  const productId = Number((await params).id);
  const { product, productTags, makers } = await getProductEditMaster({
    productId,
  });

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
            { title: '商品詳細', href: ADMIN_PRODUCTS_DETAIL_PATH(productId) },
            { title: '商品編集' },
          ]}
        />
      </div>

      <div
        className={flex({
          justifyContent: 'space-around',
          w: '100%',
          border: 'thin',
        })}
      >
        <div
          className={flex({ flexDirection: 'column', alignItems: 'center' })}
        >
          <Typography variant="subhead">総在庫</Typography>
          <Typography variant="headlineM" bold>
            {product.totalStockAmount}
          </Typography>
        </div>
        <div
          className={flex({ flexDirection: 'column', alignItems: 'center' })}
        >
          <Typography variant="subhead">貸出数</Typography>
          <Typography variant="headlineM" bold>
            {product.allocatedStockAmount}
          </Typography>
        </div>
        <div
          className={flex({ flexDirection: 'column', alignItems: 'center' })}
        >
          <Typography variant="subhead">残数</Typography>
          <Typography variant="headlineM" bold>
            {product.remainingStockAmount}
          </Typography>
        </div>
      </div>
      <ProductForm
        handleSubmit={updateProductAction}
        initialProduct={{
          id: String(product.id),
          name: product.name,
          remark: product.remark,
          url: product.url,
          makerId: String(product.maker.id),
          productTagIds: product.productTaggings.map((tagging) =>
            String(tagging.productTag.id),
          ),
        }}
        submitLabel="編集する"
        makers={makers}
        productTags={productTags}
      />
    </div>
  );
}
