import Link from 'next/link';
import { Box, Text } from '@chakra-ui/react';
import { CartIcon } from '@/components/atoms/assets/CartIcon';
import { ADMIN_PRODUCTS_PATH } from '@/utils/routes';

const Empty: React.VFC<NoProps> = () => {
  return (
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
        <a>
          <Text color="text.main" textDecoration="underline">
            商品管理へ
          </Text>
        </a>
      </Link>
    </Box>
  );
};

export { Empty };
