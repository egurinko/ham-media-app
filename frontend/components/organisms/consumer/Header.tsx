import Image from 'next/image';
import Link from 'next/link';
import { Flex, Box, Text } from '@chakra-ui/react';
import { RedirectIcon } from '@/components/atoms/assets/RedirectIcon';

type Props = Record<string, never>;

const Header: React.VFC<Props> = () => (
  <header>
    <Box
      as="nav"
      display="flex"
      position="relative"
      justifyContent="center"
      alignContent="center"
      padding={3}
      bg="white"
    >
      <Flex align="center" mr={5} cursor="pointer">
        <Link href="/hospitals">
          <a>
            <Image
              src="/ham_media_logo.png"
              alt="ハムメディアロゴ"
              width={160}
              height={35}
            />
          </a>
        </Link>
      </Flex>
      <Box position="absolute" right="0">
        <Link href="https://ham-media.net">
          <a>
            <Box
              display="flex"
              flexDir="column"
              alignItems="center"
              fill="primary.main"
              p="1"
              mr="2"
              textAlign="center"
            >
              <RedirectIcon width={20} height={20} />
              <Text fontSize="xs">HPへ</Text>
            </Box>
          </a>
        </Link>
      </Box>
    </Box>
  </header>
);

export { Header };
