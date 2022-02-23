import React from 'react';
import { Text, Box, Badge } from '@chakra-ui/react';
import { SummaryLink } from '@/components/molecules/SummaryLink';
import { ADMIN_STOCK_REQUESTS_EDIT_PATH } from '@/utils/routes';
import type { StockRequest } from '@/api/internal_api/types';

type Props = {
  stockRequest: StockRequest;
};

const StockRequestSummary: React.VFC<Props> = ({ stockRequest }) => {
  return (
    <SummaryLink url={ADMIN_STOCK_REQUESTS_EDIT_PATH(stockRequest.id)}>
      <Box display="flex" alignItems="center" p="2">
        <Box p="2">
          <Badge>承認待ち</Badge>
        </Box>
        <Box p="2">
          <Text fontSize="xs" fontWeight="bold">
            {stockRequest.internalUser.name}
          </Text>
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
              <Text size="xs">{productRegistration.product.name}</Text>
            </Box>
          ))}
        </Box>
      </Box>
    </SummaryLink>
  );
};

export { StockRequestSummary };
