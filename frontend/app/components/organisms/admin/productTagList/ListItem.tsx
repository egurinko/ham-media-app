import { ActionDialog } from '@/app/components/organisms/admin/ActionDialog';
import { ProductTagForm } from '@/app/components/organisms/admin/productTagForm/Index';
import { css } from '@/styled/css';
import {
  deleteProductTagAction,
  updateProductTagAction,
} from './listItem.action';
import type { ProductTagListItemFieldsFragment } from './listItem.api.generated';
import type { FC } from 'react';

type Props = {
  productTag: ProductTagListItemFieldsFragment;
  productTagGroupId: number;
};

export const ListItem: FC<Props> = ({ productTag, productTagGroupId }) => (
  <li
    className={css({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      borderTopWidth: 'thin',
      borderColor: 'outline.main',
      p: 'sm',
    })}
  >
    <ProductTagForm
      handleSubmit={updateProductTagAction}
      submitLabel="更新"
      initialProductTag={{
        id: String(productTag.id),
        name: productTag.name,
        productTagGroupId,
      }}
    />
    <ActionDialog
      handleClick={async () => {
        'use server';
        await deleteProductTagAction(productTag.id, productTagGroupId);
      }}
      title="タグの削除"
      description={`${productTag.name}を削除してもよろしいですか？`}
      submitLabel="削除する"
    />
  </li>
);
