import { useCallback } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import OrganismHeader from '@/components/organisms/admin/Header';

const Header: React.VFC<Record<string, never>> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleToggle = useCallback(
    () => (isOpen ? onClose() : onOpen()),
    [isOpen, onClose, onOpen]
  );

  return (
    <OrganismHeader
      isOpen={isOpen}
      onClose={onClose}
      handleToggle={handleToggle}
    />
  );
};

export default Header;
