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
      padding={4}
      bg="white"
    >
      <Flex align="center" mr={5}>
        <Image
          src="/ham_media_logo.png"
          alt="ハムメディアロゴ"
          width={200}
          height={45}
        />
      </Flex>
    </Flex>
  </header>
);

export default Header;
