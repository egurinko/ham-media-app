import LinkSvg from '../../../assets/link.svg';

type Props = {
  width: number;
  height: number;
};

const LinkIcon: React.VFC<Props> = ({ width, height }) => (
  <LinkSvg width={width} height={height} />
);

export default LinkIcon;
