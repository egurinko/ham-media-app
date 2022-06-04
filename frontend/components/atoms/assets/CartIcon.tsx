import { memo } from 'react';
import CartSvg from '../../../assets/cart.svg';

type Props = {
  width: number;
  height: number;
};

const CartIcon: React.VFC<Props> = ({ width, height }) => (
  <CartSvg width={width} height={height} />
);

const Memoed = memo(CartIcon);

export { Memoed as CartIcon };
