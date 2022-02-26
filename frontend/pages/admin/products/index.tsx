import { Heading, Box, Button } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import { InternalLayout } from '@/components/layouts/admin/InternalLayout';
import { ProductStacks } from '@/components/organisms/admin/products/index/ProductStacks';
import { StockRequestCartButton } from '@/components/organisms/admin/products/StockRequestCartButton';
import { goAdminProductsNew } from '@/utils/routes';
import { useLocalReadIsAdminQuery } from '@/api/internal_api/types';

const Index: React.VFC<NoProps> = () => {
  const router = useRouter();
  const { data: isAdminData } = useLocalReadIsAdminQuery();

  return (
    <InternalLayout>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb="2"
      >
        <Heading size="sm">商品管理</Heading>
        <Button
          bgColor="primary.main"
          color="white"
          size="md"
          leftIcon={<AddIcon />}
          onClick={() => goAdminProductsNew(router)}
          disabled={!isAdminData?.readIsAdmin.isAdmin}
        >
          新規登録
        </Button>
      </Box>
      <ProductStacks />
      <StockRequestCartButton />
    </InternalLayout>
  );
};

export default Index;
