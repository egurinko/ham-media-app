import ChavronRight from '@/assets/chavron_right.svg';
import type { FC } from 'react';

type Props = {
  width: number;
  height: number;
};

export const ChavronRightIcon: FC<Props> = ({ width, height }) => (
  <ChavronRight width={width} height={height} />
);
