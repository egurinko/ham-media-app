import { Box, Badge } from '@chakra-ui/react';
import Link from 'next/link';
import { memo } from 'react';
import { SecondaryButton } from '@/components/atoms/SecondaryButton';
import { CartIcon } from '@/components/atoms/assets/CartIcon';
import { useInternalGetSessionQuery } from '@/services/api/internal_api/types';
import { ADMIN_STOCK_REQUESTS_NEW_PATH } from '@/utils/routes';
import type { FC } from 'react';

const StockRequestCartButton: FC<NoProps> = () => {
  const { data: sessionData } = useInternalGetSessionQuery();
  const cart = sessionData?.session.internalUser.cart;
  const count = cart
    ? Object.values(cart.items).reduce(
        (accumulate, item) => item.count + accumulate,
        0,
      )
    : 0;

  return (
    <Box position="fixed" right="3" bottom="3">
      <Link
        href={ADMIN_STOCK_REQUESTS_NEW_PATH}
        passHref
        style={{ display: 'block' }}
      >
        <SecondaryButton
          w="16"
          height="16"
          fill="primary.main"
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
            {count}
          </Badge>
        </SecondaryButton>
      </Link>
    </Box>
  );
};

const Memoed = memo(StockRequestCartButton);

export { Memoed as StockRequestCartButton };
