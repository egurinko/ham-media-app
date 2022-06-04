import { memo } from 'react';
import HospitalSvg from '../../../assets/hospital.svg';
import type { FC } from 'react';

type Props = {
  width: number;
  height: number;
};

const HospitalIcon: FC<Props> = ({ width, height }) => (
  <HospitalSvg width={width} height={height} />
);

const Memoed = memo(HospitalIcon);

export { Memoed as HospitalIcon };
