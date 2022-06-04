import { memo } from 'react';
import FilterSvg from '../../../assets/filter.svg';

type Props = {
  width: number;
  height: number;
};

const FilterIcon: React.VFC<Props> = ({ width, height }) => (
  <FilterSvg width={width} height={height} />
);

const Memoed = memo(FilterIcon);

export { Memoed as FilterIcon };
