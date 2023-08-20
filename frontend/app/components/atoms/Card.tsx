import { css } from '@/styled/css';
import type { FC, PropsWithChildren } from 'react';

export const Card: FC<PropsWithChildren<NoProps>> = ({ children }) => (
  <div
    className={css({
      bgColor: 'background.main',
      shadow: 'lg',
      width: 'full',
      p: '6',
    })}
  >
    {children}
  </div>
);
