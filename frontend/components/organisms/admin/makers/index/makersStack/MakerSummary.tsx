import { Text, Box, IconButton } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import React from 'react';
import type { InternalGetMakersQuery } from '@/api/internal_api/types';
import { SummaryLink } from '@/components/molecules/SummaryLink';
import { ADMIN_MAKERS_EDIT_PATH } from '@/utils/routes';

type Maker = InternalGetMakersQuery['makers'][number];
type Props = {
  maker: Maker;
  handleDeleteOpen: (e: React.MouseEvent, maker: Maker) => void;
};

const MakerSummary: React.VFC<Props> = ({ maker, handleDeleteOpen }) => {
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
          />
        </Box>
      </Box>
    </SummaryLink>
  );
};

export { MakerSummary };
