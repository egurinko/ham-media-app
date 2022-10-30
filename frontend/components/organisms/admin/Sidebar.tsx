import { Box, Divider, Button } from '@chakra-ui/react';
import Image from 'next/image';
import { memo } from 'react';
import { UserCard } from '@/components/molecules/UserCard';
import type { InternalGetSessionQuery } from '@/services/api/internal_api/types';
import { Navigation } from './Navigation';
import type { FC } from 'react';

type Props = {
  internalUser: InternalGetSessionQuery['session']['internalUser'];
  handleLogout: () => void;
};

const Sidebar: FC<Props> = ({ internalUser, handleLogout }) => (
  <Box
    w={250}
    bg="white"
    height="100vh"
    position="fixed"
    display="flex"
    flexDirection="column"
    alignItems="center"
    as="aside"
  >
    <Box my="8">
      <Image
        src="/ham_media_logo.png"
        alt="ハムメディアロゴ"
        width={150}
        height={35}
      />
    </Box>
    <Navigation />
    <Divider mt="16" />
    <UserCard name={internalUser.name} email={internalUser.email} />
    <Button onClick={handleLogout}>ログアウト</Button>
  </Box>
);

const Memoed = memo(Sidebar);

export { Memoed as Sidebar };
