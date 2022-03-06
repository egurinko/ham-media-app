import { AddIcon } from '@chakra-ui/icons';
import { Heading, Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useLocalReadIsAdminQuery } from '@/api/internal_api/types';
import { PrimaryButton } from '@/components/atoms/PrimaryButton';
import { InternalLayout } from '@/components/layouts/admin/InternalLayout';
import { StockRequestCartButton } from '@/components/organisms/admin/products/StockRequestCartButton';
import { ProductStacks } from '@/components/organisms/admin/products/index/ProductStacks';
import { goAdminProductsNew } from '@/utils/routes';

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
        <PrimaryButton
          size="md"
          leftIcon={<AddIcon />}
          onClick={() => goAdminProductsNew(router)}
          disabled={!isAdminData?.readIsAdmin.isAdmin}
        >
          新規登録
        </PrimaryButton>
      </Box>
      <ProductStacks />
      <StockRequestCartButton />
    </InternalLayout>
  );
};

export default Index;
