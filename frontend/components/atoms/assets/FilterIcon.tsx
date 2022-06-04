import { memo } from 'react';
import FilterSvg from '../../../assets/filter.svg';
import type { FC } from 'react';

type Props = {
  width: number;
  height: number;
};

const FilterIcon: FC<Props> = ({ width, height }) => (
  <FilterSvg width={width} height={height} />
);

const Memoed = memo(FilterIcon);

export { Memoed as FilterIcon };
