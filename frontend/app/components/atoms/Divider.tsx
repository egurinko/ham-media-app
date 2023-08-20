import { css } from '@/styled/css';
import type { FC } from 'react';

export const Divider: FC<NoProps> = () => (
  <div
    className={css({
      borderBottomWidth: '1px',
      borderColor: 'borders.main',
      borderStyle: 'solid',
    })}
  />
);
