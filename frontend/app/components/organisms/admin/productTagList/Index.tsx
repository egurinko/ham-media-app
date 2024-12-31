import { css } from '@/styled/css';
import { ListItem } from './ListItem';
import { getProductTags } from './index.api';
import type { FC } from 'react';

type Props = {
  productTagGroupId: number;
};

export const ProductTagList: FC<Props> = async ({ productTagGroupId }) => {
  const productTags = await getProductTags({ productTagGroupId });

  return (
    <ul
      className={css({
        width: '100%',
        borderBottomWidth: 'thin',
        borderColor: 'outline.main',
      })}
    >
      {productTags.map((productTag) => (
        <ListItem
          key={productTag.id}
          productTag={productTag}
          productTagGroupId={productTagGroupId}
        />
      ))}
    </ul>
  );
};
