import { useCallback } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import OrganismHeader from '@/components/organisms/admin/Header';
import type { InternalGetSessionQuery } from '@/api/internal_api/types';

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
    <OrganismHeader
      isOpen={isOpen}
      onClose={onClose}
      handleToggle={handleToggle}
      internalUser={internalUser}
      handleLogout={handleLogout}
    />
  );
};

export default Header;
