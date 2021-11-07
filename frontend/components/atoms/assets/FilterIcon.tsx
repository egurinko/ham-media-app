import FilterSvg from '../../../assets/filter.svg';

type Props = {
  width: number;
  height: number;
};

const FilterIcon: React.VFC<Props> = ({ width, height }) => (
  <FilterSvg width={width} height={height} />
);

export { FilterIcon };
