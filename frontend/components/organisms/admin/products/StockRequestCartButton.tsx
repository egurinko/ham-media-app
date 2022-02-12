import React from 'react';
import Link from 'next/link';
import { Button, Box, Badge } from '@chakra-ui/react';
import { ADMIN_STOCK_REQUESTS_NEW_PATH } from '@/utils/routes';
import { CartIcon } from '@/components/atoms/assets/CartIcon';
import { useLocalGetProductCartItemsQuery } from '@/api/internal_api/types';

const StockRequestCartButton: React.VFC<NoProps> = ({}) => {
  const { data } = useLocalGetProductCartItemsQuery();
  const count = data?.productCartItems.reduce(
    (count, item) => count + item.count,
    0
  );
  return (
    <Box position="fixed" right="3" bottom="3">
      <Link href={ADMIN_STOCK_REQUESTS_NEW_PATH}>
        <a>
          <Button
            w="16"
            height="16"
            fill="primary.main"
            bgColor="primary.light"
            color="primary.main"
            borderRadius="50%"
            boxShadow="lg"
          >
            <Box ml="-2">
              <CartIcon width={45} height={45} />
            </Box>
            <Badge
              ml="-8"
              mb="1"
              colorScheme="unset"
              borderRadius="50%"
              fontSize="md"
            >
              {count || 0}
            </Badge>
          </Button>
        </a>
      </Link>
    </Box>
  );
};

export { StockRequestCartButton };
