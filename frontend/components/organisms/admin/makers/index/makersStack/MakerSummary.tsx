import { DeleteIcon } from '@chakra-ui/icons';
import { Text, Box, IconButton } from '@chakra-ui/react';
import React from 'react';
import { useLocalReadIsAdminQuery } from '@/api/internal_api/types';
import type { InternalGetMakersQuery } from '@/api/internal_api/types';
import { SummaryLink } from '@/components/molecules/SummaryLink';
import { ADMIN_MAKERS_EDIT_PATH } from '@/utils/routes';

type Maker = InternalGetMakersQuery['makers'][number];
type Props = {
  maker: Maker;
  handleDeleteOpen: (e: React.MouseEvent, maker: Maker) => void;
};

const MakerSummary: React.VFC<Props> = ({ maker, handleDeleteOpen }) => {
  const { data: isAdminData } = useLocalReadIsAdminQuery();
  return (
    <SummaryLink url={ADMIN_MAKERS_EDIT_PATH(maker.id)}>
      <Box display="flex" flexDirection="row" alignItems="center" p="2">
        <Box flex="1">
          <Text fontSize="xl" fontWeight="bold">
            {maker.name}
          </Text>
        </Box>
        <Box>
          <IconButton
            aria-label="delete user"
            icon={<DeleteIcon />}
            color="gray"
            onClick={(e) => handleDeleteOpen(e, maker)}
            disabled={!isAdminData?.readIsAdmin.isAdmin}
          />
        </Box>
      </Box>
    </SummaryLink>
  );
};

export { MakerSummary };
