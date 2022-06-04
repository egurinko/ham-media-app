import { memo } from 'react';
import MapPinSvg from '../../../assets/map_pin.svg';

type Props = {
  width: number;
  height: number;
};

const MapPinIcon: React.VFC<Props> = ({ width, height }) => (
  <MapPinSvg width={width} height={height} />
);

const Memoed = memo(MapPinIcon);

export { Memoed as MapPinIcon };
