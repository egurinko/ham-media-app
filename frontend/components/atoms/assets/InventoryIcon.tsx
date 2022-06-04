import { memo } from 'react';
import InventorySvg from '../../../assets/inventory.svg';

type Props = {
  width: number;
  height: number;
};

const InventoryIcon: React.VFC<Props> = ({ width, height }) => (
  <InventorySvg width={width} height={height} />
);

const Memoed = memo(InventoryIcon);

export { Memoed as InventoryIcon };
