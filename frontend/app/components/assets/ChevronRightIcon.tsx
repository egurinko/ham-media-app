import ChevronRight from '@/assets/chevron_right.svg';
import type { FC } from 'react';

type Props = {
  width: number;
  height: number;
};

export const ChevronRightIcon: FC<Props> = ({ width, height }) => (
  <ChevronRight width={width} height={height} />
);
