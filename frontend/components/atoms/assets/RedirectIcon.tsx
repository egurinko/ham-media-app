import { memo } from 'react';
import RedirectSvg from '../../../assets/redirect.svg';
import type { FC } from 'react';

type Props = {
  width: number;
  height: number;
};

const RedirectIcon: FC<Props> = ({ width, height }) => (
  <RedirectSvg width={width} height={height} />
);

const Memoed = memo(RedirectIcon);

export { Memoed as RedirectIcon };
