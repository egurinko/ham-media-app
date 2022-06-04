import { memo } from 'react';
import InsuranceSvg from '../../../assets/insurance.svg';
import type { FC } from 'react';

type Props = {
  width: number;
  height: number;
};

const InsuranceIcon: FC<Props> = ({ width, height }) => (
  <InsuranceSvg width={width} height={height} />
);

const Memoed = memo(InsuranceIcon);

export { Memoed as InsuranceIcon };
