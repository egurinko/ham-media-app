import InventorySvg from '../../../assets/inventory.svg';

type Props = {
  width: number;
  height: number;
};

const InventoryIcon: React.VFC<Props> = ({ width, height }) => (
  <InventorySvg width={width} height={height} />
);

export { InventoryIcon };
