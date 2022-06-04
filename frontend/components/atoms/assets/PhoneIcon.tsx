import { memo } from 'react';
import PhoneSvg from '../../../assets/phone.svg';
import type { FC } from 'react';

type Props = {
  width: number;
  height: number;
};

const PhoneIcon: FC<Props> = ({ width, height }) => (
  <PhoneSvg width={width} height={height} />
);

const Memoed = memo(PhoneIcon);

export { Memoed as PhoneIcon };
