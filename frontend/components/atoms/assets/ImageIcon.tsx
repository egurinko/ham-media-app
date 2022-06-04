import { memo } from 'react';
import ImageSvg from '../../../assets/image.svg';
import type { FC } from 'react';

type Props = {
  width: number;
  height: number;
};

const ImageIcon: FC<Props> = ({ width, height }) => (
  <ImageSvg width={width} height={height} />
);

const Memoed = memo(ImageIcon);

export { Memoed as ImageIcon };
