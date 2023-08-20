import LinkSvg from '../../../assets/link.svg';
import type { FC } from 'react';

type Props = {
  width: number;
  height: number;
};

export const LinkIcon: FC<Props> = ({ width, height }) => (
  <LinkSvg width={width} height={height} />
);
