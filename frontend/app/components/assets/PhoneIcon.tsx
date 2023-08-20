import PhoneSvg from '../../../assets/phone.svg';
import type { FC } from 'react';

type Props = {
  width: number;
  height: number;
};

export const PhoneIcon: FC<Props> = ({ width, height }) => (
  <PhoneSvg width={width} height={height} />
);
