import { memo } from 'react';
import MapPinSvg from '../../../assets/map_pin.svg';
import type { FC } from 'react';

type Props = {
  width: number;
  height: number;
};

const MapPinIcon: FC<Props> = ({ width, height }) => (
  <MapPinSvg width={width} height={height} />
);

const Memoed = memo(MapPinIcon);

export { Memoed as MapPinIcon };
