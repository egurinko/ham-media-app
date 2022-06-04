import { memo } from 'react';
import NightSvg from '../../../assets/night.svg';
import type { FC } from 'react';

type Props = {
  width: number;
  height: number;
};

const NightIcon: FC<Props> = ({ width, height }) => (
  <NightSvg width={width} height={height} />
);

const Memoed = memo(NightIcon);

export { Memoed as NightIcon };
