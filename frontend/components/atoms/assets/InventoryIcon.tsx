import { memo } from 'react';
import InventorySvg from '../../../assets/inventory.svg';
import type { FC } from 'react';

type Props = {
  width: number;
  height: number;
};

const InventoryIcon: FC<Props> = ({ width, height }) => (
  <InventorySvg width={width} height={height} />
);

const Memoed = memo(InventoryIcon);

export { Memoed as InventoryIcon };
