import { memo } from 'react';
import LinkSvg from '../../../assets/link.svg';
import type { FC } from 'react';

type Props = {
  width: number;
  height: number;
};

const LinkIcon: FC<Props> = ({ width, height }) => (
  <LinkSvg width={width} height={height} />
);

const Memoed = memo(LinkIcon);

export { Memoed as LinkIcon };
