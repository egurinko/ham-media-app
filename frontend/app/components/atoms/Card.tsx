import { css } from '@/styled/css';
import type { FC, PropsWithChildren } from 'react';

export const Card: FC<PropsWithChildren<NoProps>> = ({ children }) => (
  <div
    className={css({
      bgColor: 'surface.container-highest',
      shadow: 'none',
      width: 'full',
      p: '6',
      borderRadius: 'md',
    })}
  >
    {children}
  </div>
);
