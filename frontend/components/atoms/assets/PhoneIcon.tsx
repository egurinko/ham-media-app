import PhoneSvg from '../../../assets/phone.svg';

type Props = {
  width: number;
  height: number;
};

const PhoneIcon: React.VFC<Props> = ({ width, height }) => (
  <PhoneSvg width={width} height={height} />
);

export default PhoneIcon;
