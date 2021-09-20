import { Box } from '@chakra-ui/react';
import Image from 'next/image';
import Navigation from '@/components/ecosystems/admin/Navigation';

type Props = Record<string, never>;

const Sidebar: React.VFC<Props> = () => (
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
  </Box>
);

export default Sidebar;
