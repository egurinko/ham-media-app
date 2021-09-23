import RedirectSvg from '../../../assets/redirect.svg';

type Props = {
  width: number;
  height: number;
};

const RedirectIcon: React.VFC<Props> = ({ width, height }) => (
  <RedirectSvg width={width} height={height} />
);

export default RedirectIcon;
