import { memo } from 'react';
import InsuranceSvg from '../../../assets/insurance.svg';

type Props = {
  width: number;
  height: number;
};

const InsuranceIcon: React.VFC<Props> = ({ width, height }) => (
  <InsuranceSvg width={width} height={height} />
);

const Memoed = memo(InsuranceIcon);

export { Memoed as InsuranceIcon };
