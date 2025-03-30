import { ProductSummary } from '@/app/components/organisms/admin/productSummary/Index';
import { css } from '@/styled/css';
import type { ProductListItemFieldsFragment } from './index.api.generated';
import type { FC } from 'react';

type Props = {
  product: ProductListItemFieldsFragment;
};

export const ListItem: FC<Props> = ({ product }) => (
  <li
    key={product.id}
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
    <ProductSummary product={product} />
  </li>
);
