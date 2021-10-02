import InsuranceSvg from '../../../assets/insurance.svg';

type Props = {
  width: number;
  height: number;
};

const InsuranceIcon: React.VFC<Props> = ({ width, height }) => (
  <InsuranceSvg width={width} height={height} />
);

export default InsuranceIcon;
