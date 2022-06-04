import { memo } from 'react';
import NightSvg from '../../../assets/night.svg';

type Props = {
  width: number;
  height: number;
};

const NightIcon: React.VFC<Props> = ({ width, height }) => (
  <NightSvg width={width} height={height} />
);

const Memoed = memo(NightIcon);

export { Memoed as NightIcon };
