import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Divider,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
 useDisclosure } from '@chakra-ui/react';
import Image from 'next/image';
import { useCallback } from 'react';
import type { InternalGetSessionQuery } from '@/api/internal_api/types';
import { UserCard } from '@/components/molecules/UserCard';
import { Navigation } from './Navigation';

type Props = {
  internalUser: InternalGetSessionQuery['session']['internalUser'];
  handleLogout: () => void;
};

const Header: React.VFC<Props> = ({ internalUser, handleLogout }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleToggle = useCallback(
    () => (isOpen ? onClose() : onOpen()),
    [isOpen, onClose, onOpen]
  );

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
            <Divider mt="16" />
            <Box display="flex" flexDir="column" alignItems="center">
              <UserCard name={internalUser.name} email={internalUser.email} />
              <Button onClick={handleLogout}>ログアウト</Button>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export { Header };
