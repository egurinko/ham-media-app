import { css } from '@/styled/css';
import type { FC } from 'react';

type Props = {
  size: string;
};

export const SkeletonCircle: FC<Props> = ({ size = '1rem' }) => (
  <div
    className={css({
      borderRadius: 'full',
      bgColor: '#E0E0E0',
      animation: 'pulse 1.5s infinite ease-in-out',
      width: size,
      height: size,
    })}
  ></div>
);
