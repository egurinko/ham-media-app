import {
  Box,
  Flex,
  Divider,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import Image from 'next/image';
import Navigation from './Navigation';

const Header: React.VFC<Record<string, never>> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleToggle = () => (isOpen ? onClose() : onOpen());

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={4}
      bg="white"
      position="fixed"
      w="100%"
      zIndex="10"
    >
      <Flex align="center" mr={5}>
        <Image
          src="/ham_media_logo.png"
          alt="ハムメディアロゴ"
          width={150}
          height={35}
        />
      </Flex>

      <Box display={{ base: 'block', md: 'none' }} onClick={handleToggle}>
        <HamburgerIcon />
      </Box>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xs">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader textAlign="center">
            <Image
              src="/ham_media_logo.png"
              alt="ハムメディアロゴ"
              width={150}
              height={35}
            />
            <Divider mt="2" />
          </DrawerHeader>

          <DrawerBody>
            <Navigation />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default Header;
