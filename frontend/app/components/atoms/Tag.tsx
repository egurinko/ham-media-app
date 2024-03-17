import { Typography } from '@/app/components/atoms/Typography';
import { css } from '@/styled/css';
import type { FC, PropsWithChildren } from 'react';

export const Tag: FC<PropsWithChildren<NoProps>> = ({ children }) => (
  <div
    className={css({
      bgColor: 'primary.main',
      color: 'primary.on-main',
      p: 1,
      borderRadius: 'sm',
      display: 'inline',
    })}
  >
    <Typography variant="body2" display="inline">
      {children}
    </Typography>
  </div>
);
