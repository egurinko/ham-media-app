import Alert from '@/assets/alert.svg';
import type { FC } from 'react';

type Props = {
  width: number;
  height: number;
};

export const AlertIcon: FC<Props> = ({ width, height }) => (
  <Alert width={width} height={height} />
);
