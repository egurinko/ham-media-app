import { AddIcon } from '@chakra-ui/icons';
import { Heading, Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { PrimaryButton } from '@/components/atoms/PrimaryButton';
import { InternalLayout } from '@/components/layouts/admin/InternalLayout';
import { StockRequestCartButton } from '@/components/organisms/admin/products/StockRequestCartButton';
import { ProductStacks } from '@/components/organisms/admin/products/index/ProductStacks';
import { useLocalReadIsAdminQuery } from '@/services/api/local_api/types';
import { goAdminProductsNew } from '@/utils/routes';
import type { ReactElement } from 'react';

const Index = () => {
  const router = useRouter();
  const { data: isAdminData } = useLocalReadIsAdminQuery();

  return (
    <>
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
    </>
  );
};

Index.getLayout = (page: ReactElement) => (
  <InternalLayout>{page}</InternalLayout>
);

export default Index;
