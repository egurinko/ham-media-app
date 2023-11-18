import { Box, Badge, Button } from '@chakra-ui/react';
import Link from 'next/link';
import { memo } from 'react';
import { CartIcon } from '@/components/atoms/assets/CartIcon';
import { useLocalGetProductCartItemsQuery } from '@/services/api/local_api/types';
import { ADMIN_STOCK_REQUESTS_NEW_PATH } from '@/utils/routes';
import type { FC } from 'react';

const StockRequestCartButton: FC<NoProps> = () => {
  const { data } = useLocalGetProductCartItemsQuery();
  const count = data?.productCartItems.reduce(
    (count, item) => count + item.count,
    0,
  );
  return (
    <Box position="fixed" right="3" bottom="3">
      <Button
        w="16"
        height="16"
        fill="primary.main"
        bgColor="primary.light"
        color="primary.main"
        borderRadius="50%"
        boxShadow="lg"
        as={Link}
        href={ADMIN_STOCK_REQUESTS_NEW_PATH}
      >
        <Box ml="-2">
          <CartIcon width={45} height={45} />
        </Box>
        <Badge
          ml="-8"
          mb="1"
          color="primary.main"
          bg="transparent"
          borderRadius="50%"
          fontSize="md"
        >
          {count || 0}
        </Badge>
      </Button>
    </Box>
  );
};

const Memoed = memo(StockRequestCartButton);

export { Memoed as StockRequestCartButton };
