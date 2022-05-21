import ImageSvg from '../../../assets/image.svg';

type Props = {
  width: number;
  height: number;
};

const ImageIcon: React.VFC<Props> = ({ width, height }) => (
  <ImageSvg width={width} height={height} />
);

export { ImageIcon };
