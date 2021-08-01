import { Box, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import Image from 'next/image';

type Props = {};

const Sidebar: React.VFC<Props> = ({}) => (
  <aside>
    <Box
      w={250}
      bg="white"
      minH="100vh"
      d="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Box my="8">
        <Image
          src="/ham_media_logo.png"
          alt="ハムメディアロゴ"
          width={150}
          height={35}
        />
      </Box>
      <VStack spacing="16" mt="8">
        <Box>
          <Link href="/admin/internal_users">
            <a>ユーザ管理</a>
          </Link>
        </Box>
        <Box>
          <Link href="/admin/internal_users">
            <a>病院管理</a>
          </Link>
        </Box>
      </VStack>
    </Box>
  </aside>
);

export default Sidebar;
