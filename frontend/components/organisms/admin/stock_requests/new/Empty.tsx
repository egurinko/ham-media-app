import { Box, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { memo } from 'react';
import { CartIcon } from '@/components/atoms/assets/CartIcon';
import { ADMIN_PRODUCTS_PATH } from '@/utils/routes';
import type { FC } from 'react';

const Empty: FC<NoProps> = () => (
  <Box
    display="flex"
    flexDir="column"
    alignItems="center"
    fill="primary.main"
    color="white"
  >
    <CartIcon width={40} height={40} />
    <Box mt="4" color="text.main">
      カートは空です。追加する商品を選んでください
    </Box>
    <Link as="button" href={ADMIN_PRODUCTS_PATH}>
      <Text color="text.main" textDecoration="underline">
        商品管理へ
      </Text>
    </Link>
  </Box>
);

const Memoed = memo(Empty);

export { Memoed as Empty };
