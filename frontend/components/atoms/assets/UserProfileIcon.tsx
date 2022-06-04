import { memo } from 'react';
import UserProfileSvg from '../../../assets/user_profile.svg';
import type { FC } from 'react';

type Props = {
  width: number;
  height: number;
};

const UserProfileIcon: FC<Props> = ({ width, height }) => (
  <UserProfileSvg width={width} height={height} />
);

const Memoed = memo(UserProfileIcon);

export { Memoed as UserProfileIcon };
