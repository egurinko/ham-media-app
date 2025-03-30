import { Typography } from '@/app/components/atoms/Typography';
import { css } from '@/styled/css';
import type { FC, PropsWithChildren } from 'react';

type Props = {
  visual?: 'primary' | 'tonal';
  size?: 'md' | 'sm';
};

export const Tag: FC<PropsWithChildren<Props>> = ({
  visual = 'primary',
  size = 'md',
  children,
}) => (
  <div
    className={css({
      bgColor: visual === 'primary' ? 'primary.main' : 'primary.container',
      color: visual === 'primary' ? 'primary.on-main' : 'primary.on-container',
      p: 1,
      borderRadius: 'sm',
      display: 'inline',
    })}
  >
    <Typography variant={size === 'md' ? 'body2' : 'caption'} display="inline">
      {children}
    </Typography>
  </div>
);
