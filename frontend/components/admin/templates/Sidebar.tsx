import { Box, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import Image from 'next/image';
import UserIcon from '../../assets/user_profile.svg';
import HospitalIcon from '../../assets/hospital.svg';
import Navigation from './Navigation';

type Props = {};

const Sidebar: React.VFC<Props> = ({}) => (
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
