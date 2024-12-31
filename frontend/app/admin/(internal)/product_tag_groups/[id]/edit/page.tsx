import { Suspense } from 'react';
import { Card } from '@/app/components/atoms/Card';
import { Typography } from '@/app/components/atoms/Typography';
import { Breadcrumbs } from '@/app/components/molecules/Breadcrumbs';
import { FlashMessage } from '@/app/components/molecules/FlashMessage';
import { ProductTagGroupForm } from '@/app/components/organisms/admin/productTagGroupForm/Index';
import { ProductTagList } from '@/app/components/organisms/admin/productTagList/Index';
import { ProductTagsNewForm } from '@/app/components/organisms/admin/productTagsNewForm/Index';
import { ListSkeleton } from '@/app/components/organisms/admin/skeletons/ListSkeleton';
import { css } from '@/styled/css';
import { ADMIN_PRODUCT_TAG_GROUPS_PATH } from '@/utils/routes';
import { updateProductTagGroupAction } from './page.action';
import { getProductTagGroup } from './page.api';

type Props = {
  params: Params;
};

type Params = Promise<{
  id: string;
}>;

export const dynamicParams = true;
export async function generateStaticParams(): Promise<Params[]> {
  return [];
}

export default async function Page(props: Props) {
  const params = await props.params;
  const productTagGroup = await getProductTagGroup({
    id: Number(params.id),
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
            { title: 'タグカテゴリー編集' },
          ]}
        />
      </div>
      <Card
        className={css({
          width: '100%',
          p: 'lg',
        })}
      >
        <ProductTagGroupForm
          handleSubmit={updateProductTagGroupAction}
          initialProductTagGroup={{
            id: String(productTagGroup.id),
            name: productTagGroup.name,
          }}
          submitLabel="更新する"
        />
      </Card>
      <Card
        className={css({
          width: '100%',
          p: 'lg',
        })}
      >
        <Typography variant="subhead" bold={true}>
          タグ一覧
        </Typography>
        <Suspense fallback={<ListSkeleton />}>
          <ProductTagList productTagGroupId={productTagGroup.id} />
        </Suspense>
        <Typography
          variant="subhead"
          bold={true}
          className={css({
            mt: 'lg',
          })}
        >
          タグ追加
        </Typography>
        <ProductTagsNewForm productTagGroupId={productTagGroup.id} />
      </Card>
    </div>
  );
}
