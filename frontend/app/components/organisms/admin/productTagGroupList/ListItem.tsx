import Link from 'next/link';
import { Typography } from '@/app/components/atoms/Typography';
import { css } from '@/styled/css';
import { ADMIN_PRODUCT_TAG_GROUPS_EDIT_PATH } from '@/utils/routes';
import type { ProductTagGroupListItemFieldsFragment } from './listItem.api.generated';
import type { FC } from 'react';

type Props = {
  productTagGroup: ProductTagGroupListItemFieldsFragment;
};

export const ListItem: FC<Props> = ({ productTagGroup }) => (
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
    <Link
      href={ADMIN_PRODUCT_TAG_GROUPS_EDIT_PATH(productTagGroup.id)}
      className={css({
        textDecoration: 'underline',
      })}
    >
      <Typography variant="body1" bold={true}>
        {productTagGroup.name}
      </Typography>
    </Link>
    <div>
      {productTagGroup.productTags.map((productTag) => (
        <Typography
          key={productTag.id}
          variant="body1"
          className={css({
            w: '150px',
          })}
        >
          ・{productTag.name}
        </Typography>
      ))}
    </div>
  </li>
);
