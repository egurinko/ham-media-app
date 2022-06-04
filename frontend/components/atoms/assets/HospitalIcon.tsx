import { memo } from 'react';
import HospitalSvg from '../../../assets/hospital.svg';

type Props = {
  width: number;
  height: number;
};

const HospitalIcon: React.VFC<Props> = ({ width, height }) => (
  <HospitalSvg width={width} height={height} />
);

const Memoed = memo(HospitalIcon);

export { Memoed as HospitalIcon };
