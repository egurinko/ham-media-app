import { Box, Divider, Button } from '@chakra-ui/react';
import Image from 'next/image';
import Navigation from '@/components/ecosystems/admin/Navigation';
import UserCard from '@/components/molecules/UserCard';
import type { InternalGetSessionQuery } from '@/api/internal_api/types';

type Props = {
  internalUser: InternalGetSessionQuery['session']['internalUser'];
  handleLogout: () => void;
};

const Sidebar: React.VFC<Props> = ({ internalUser, handleLogout }) => (
  <Box
    w={250}
    bg="white"
    height="100vh"
    position="fixed"
    d="flex"
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

export default Sidebar;
