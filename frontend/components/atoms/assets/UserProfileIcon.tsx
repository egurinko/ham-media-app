import UserProfileSvg from '../../../assets/user_profile.svg';

type Props = {
  width: number;
  height: number;
};

const UserProfileIcon: React.VFC<Props> = ({ width, height }) => (
  <UserProfileSvg width={width} height={height} />
);

export default UserProfileIcon;
