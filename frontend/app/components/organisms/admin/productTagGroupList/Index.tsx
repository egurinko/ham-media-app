import { css } from '@/styled/css';
import { ListItem } from './ListItem';
import { getProductTagGroups } from './index.api';
import type { FC } from 'react';

export const ProductTagGroupList: FC<NoProps> = async () => {
  const productTagGroups = await getProductTagGroups({});

  return (
    <ul
      className={css({
        width: '100%',
        borderBottomWidth: 'thin',
        borderColor: 'outline.main',
      })}
    >
      {productTagGroups.map((productTagGroup) => (
        <ListItem key={productTagGroup.id} productTagGroup={productTagGroup} />
      ))}
    </ul>
  );
};
