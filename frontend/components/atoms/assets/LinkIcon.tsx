import { memo } from 'react';
import LinkSvg from '../../../assets/link.svg';

type Props = {
  width: number;
  height: number;
};

const LinkIcon: React.VFC<Props> = ({ width, height }) => (
  <LinkSvg width={width} height={height} />
);

const Memoed = memo(LinkIcon);

export { Memoed as LinkIcon };
