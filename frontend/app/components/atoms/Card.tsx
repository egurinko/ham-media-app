import { css, cx } from '@/styled/css';
import type { FC, PropsWithChildren } from 'react';

type CardProps = {
  className?: string;
};

export const Card: FC<PropsWithChildren<CardProps>> = ({
  children,
  className,
}) => (
  <div
    className={cx(
      css({
        bgColor: 'surface.container-highest',
        shadow: 'none',
        width: 'full',
        p: '6',
        borderRadius: 'md',
      }),
      className,
    )}
  >
    {children}
  </div>
);
