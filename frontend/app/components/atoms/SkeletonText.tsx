import { css } from '@/styled/css';
import type { SystemProperties } from '@/styled/types/style-props';
import type { FC } from 'react';

type Props = {
  noOfLines?: number;
  spacing?: SystemProperties['padding'];
  skeletonHeight?: string;
};

export const SkeletonText: FC<Props> = ({
  noOfLines = 4,
  spacing = 'sm',
  skeletonHeight = '1rem',
}) => {
  const lines = Array.from({ length: noOfLines }).map((_, index) => (
    <div
      key={index}
      className={css({
        height: skeletonHeight,
        bgColor: '#E0E0E0',
        animation: 'pulse 1.5s infinite ease-in-out',
        borderRadius: 'xs',
      })}
    ></div>
  ));

  return (
    <div
      className={css({
        display: 'flex',
        flexDir: 'column',
        gap: spacing,
        width: '100%',
      })}
    >
      {lines}
    </div>
  );
};
