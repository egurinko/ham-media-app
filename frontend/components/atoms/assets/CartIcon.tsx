import { memo } from 'react';
import CartSvg from '../../../assets/cart.svg';
import type { FC } from 'react';

type Props = {
  width: number;
  height: number;
};

const CartIcon: FC<Props> = ({ width, height }) => (
  <CartSvg width={width} height={height} />
);

const Memoed = memo(CartIcon);

export { Memoed as CartIcon };
