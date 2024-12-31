import { Breadcrumbs } from '@/app/components/molecules/Breadcrumbs';
import { FlashMessage } from '@/app/components/molecules/FlashMessage';
import { ProductTagGroupForm } from '@/app/components/organisms/admin/productTagGroupForm/Index';
import { css } from '@/styled/css';
import { ADMIN_PRODUCT_TAG_GROUPS_PATH } from '@/utils/routes';
import { createProductTagGroupAction } from './page.action';

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
          alignItems: 'center',
          gap: 'xs',
        })}
      >
        <Breadcrumbs
          breadcrumbs={[
            {
              title: 'タグカテゴリー一覧',
              href: ADMIN_PRODUCT_TAG_GROUPS_PATH,
            },
            { title: 'タグカテゴリー登録' },
          ]}
        />
      </div>

      <ProductTagGroupForm
        handleSubmit={createProductTagGroupAction}
        initialProductTagGroup={{
          name: '',
        }}
        submitLabel="登録する"
      />
    </div>
  );
}
