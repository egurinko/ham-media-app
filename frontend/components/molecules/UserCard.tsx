import { Text, Box } from '@chakra-ui/react';
import { memo } from 'react';
import { UserProfileIcon } from '@/components/atoms/assets/UserProfileIcon';
import type { FC } from 'react';

type Props = {
  name: string;
  email: string;
};

const UserCard: FC<Props> = ({ name, email }) => (
  <Box m="4" p="2" fill="primary.main" display="flex" alignItems="center">
    <UserProfileIcon width={35} height={35} />
    <Box>
      <Text ml="2" fontSize="lg">
        {name}
      </Text>
      <Text ml="2" fontSize="sm" color="text.secondary">
        {email}
      </Text>
    </Box>
  </Box>
);

const Memoed = memo(UserCard);

export { Memoed as UserCard };
