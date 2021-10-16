import Image from 'next/image';
import { Flex } from '@chakra-ui/react';

type Props = Record<string, never>;

const Header: React.VFC<Props> = () => (
  <header>
    <Flex
      as="nav"
      align="center"
      justify="center"
      wrap="wrap"
      padding={3}
      bg="white"
    >
      <Flex align="center" mr={5}>
        <Image
          src="/ham_media_logo.png"
          alt="ハムメディアロゴ"
          width={160}
          height={35}
        />
      </Flex>
    </Flex>
  </header>
);

export default Header;
