import { DeleteIcon } from '@chakra-ui/icons';
import { Text, Box, Badge, IconButton } from '@chakra-ui/react';
import { memo } from 'react';
import { SummaryLink } from '@/components/molecules/SummaryLink';
import type { StockRequestFieldsFragment } from '@/services/api/internal_api/types';
import { ADMIN_STOCK_REQUESTS_EDIT_PATH } from '@/utils/routes';
import type { FC, MouseEvent } from 'react';

type Props = {
  stockRequest: StockRequestFieldsFragment;
  handleDeleteModalOpen: (
    e: MouseEvent,
    stockRequest: StockRequestFieldsFragment,
  ) => void;
};

const StockRequestSummary: FC<Props> = ({
  stockRequest,
  handleDeleteModalOpen,
}) => (
  <SummaryLink
    openNewWindow={false}
    url={ADMIN_STOCK_REQUESTS_EDIT_PATH(stockRequest.id)}
  >
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p="2"
    >
      <Box display="flex" alignItems="center">
        <Box p="2" fontSize="xs">
          <Badge>承認待ち</Badge>
        </Box>
        <Box p="2">
          <Text fontSize="xs" fontWeight="bold">
            {stockRequest.internalUser.name}
          </Text>
        </Box>
      </Box>
      <Box>
        {stockRequest.productRegistrations.map((productRegistration) => (
          <Box
            m="1"
            key={productRegistration.id}
            display="flex"
            alignItems="center"
          >
            <img
              src={productRegistration.product.url}
              alt={productRegistration.product.name}
              width="25"
              height="25"
              style={{
                objectFit: 'contain',
                width: '25px',
                height: '25px',
              }}
            />
            <Text fontSize="xs">{productRegistration.product.name}</Text>
          </Box>
        ))}
      </Box>
      <Box>
        <IconButton
          aria-label="delete user"
          icon={<DeleteIcon />}
          color="gray"
          onClick={(e) => handleDeleteModalOpen(e, stockRequest)}
        />
      </Box>
    </Box>
  </SummaryLink>
);

const Memoed = memo(StockRequestSummary);

export { Memoed as StockRequestSummary };
