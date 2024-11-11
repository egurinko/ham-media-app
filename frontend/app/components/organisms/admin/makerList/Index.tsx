import { css } from '@/styled/css';
import { ListItem } from './ListItem';
import { getMakers } from './index.api';
import type { FC } from 'react';

export const MakerList: FC<NoProps> = async () => {
  const makers = await getMakers({});

  return (
    <ul
      className={css({
        width: '100%',
        borderBottomWidth: 'thin',
        borderColor: 'outline.main',
      })}
    >
      {makers.map((maker) => (
        <ListItem key={maker.id} maker={maker} />
      ))}
    </ul>
  );
};
