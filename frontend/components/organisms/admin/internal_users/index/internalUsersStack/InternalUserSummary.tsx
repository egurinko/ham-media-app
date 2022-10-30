import { DeleteIcon, StarIcon } from '@chakra-ui/icons';
import { Text, Box, IconButton } from '@chakra-ui/react';
import { memo } from 'react';
import type { InternalGetInternalUsersQuery } from '@/services/api/internal_api/types';
import { useLocalReadIsAdminQuery } from '@/services/api/local_api/types';
import { UserProfileIcon } from '@/components/atoms/assets/UserProfileIcon';
import { SummaryLink } from '@/components/molecules/SummaryLink';
import { ADMIN_INTERNAL_USERS_EDIT_PATH } from '@/utils/routes';
import type { FC } from 'react';

type InternalUser = InternalGetInternalUsersQuery['internalUsers'][number];

type Props = {
  internalUser: InternalUser;
  handleDeleteOpen: (e: React.MouseEvent, internalUser: InternalUser) => void;
};

const InternalUserSummary: FC<Props> = ({ internalUser, handleDeleteOpen }) => {
  const { data: isAdminData } = useLocalReadIsAdminQuery();

  return (
    <SummaryLink url={ADMIN_INTERNAL_USERS_EDIT_PATH(internalUser.id)}>
      <Box
        w="100%"
        display="flex"
        flexDirection="row"
        alignItems="center"
        p="2"
      >
        <Box mr="4" fill="primary.main">
          <UserProfileIcon width={35} height={35} />
        </Box>
        <Box flex="1">
          <Box display="flex" alignItems="center">
            <Text fontSize="xl" fontWeight="bold">
              {internalUser.name}
            </Text>
            <Box p="0" ml="2">
              {internalUser.role.name === 'admin' ? (
                <StarIcon color="primary.main" />
              ) : null}
            </Box>
          </Box>
          <Text fontSize="md">{internalUser.email}</Text>
        </Box>
        <Box>
          <IconButton
            aria-label="delete user"
            icon={<DeleteIcon />}
            color="gray"
            onClick={(e) => handleDeleteOpen(e, internalUser)}
            disabled={!isAdminData?.readIsAdmin.isAdmin}
          />
        </Box>
      </Box>
    </SummaryLink>
  );
};

const Memoed = memo(InternalUserSummary);

export { Memoed as InternalUserSummary };
