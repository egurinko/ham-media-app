import { memo } from 'react';
import RedirectSvg from '../../../assets/redirect.svg';

type Props = {
  width: number;
  height: number;
};

const RedirectIcon: React.VFC<Props> = ({ width, height }) => (
  <RedirectSvg width={width} height={height} />
);

const Memoed = memo(RedirectIcon);

export { Memoed as RedirectIcon };
