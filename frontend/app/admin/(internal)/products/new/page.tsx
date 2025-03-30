import { Breadcrumbs } from '@/app/components/molecules/Breadcrumbs';
import { ProductForm } from '@/app/components/organisms/admin/productForm/Index';
import { css } from '@/styled/css';
import { ADMIN_PRODUCTS_PATH } from '@/utils/routes';
import { createProductAction } from './page.action';
import { getProductNewMaster } from './page.api';

export default async function Page() {
  const { makers, productTags } = await getProductNewMaster({});
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
          gap: 'xs',
        })}
      >
        <Breadcrumbs
          breadcrumbs={[
            { title: '商品一覧', href: ADMIN_PRODUCTS_PATH },
            { title: '商品登録' },
          ]}
        />
      </div>
      <ProductForm
        handleSubmit={createProductAction}
        initialProduct={{
          name: '',
          remark: '',
          url: '',
          makerId: makers[0].value,
          productTagIds: [],
        }}
        submitLabel="登録する"
        makers={makers}
        productTags={productTags}
      />
    </div>
  );
}
