import Image from 'next/image';
import Link from 'next/link';
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
    </Flex>
  </header>
);

export { Header };
