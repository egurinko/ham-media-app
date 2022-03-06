import { AddIcon } from '@chakra-ui/icons';
import { Heading, Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { PrimaryButton } from '@/components/atoms/PrimaryButton';
import { InternalLayout } from '@/components/layouts/admin/InternalLayout';
import { StockRequestsStack } from '@/components/organisms/admin/stock_requests/index/StockRequestsStack';
import { goAdminStockRequestsNew } from '@/utils/routes';

const Index: React.VFC<NoProps> = () => {
  const router = useRouter();

  return (
    <InternalLayout>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb="2"
      >
        <Heading size="sm">在庫リクエスト管理</Heading>
        <PrimaryButton
          size="md"
          leftIcon={<AddIcon />}
          onClick={() => goAdminStockRequestsNew(router)}
        >
          カートを確認
        </PrimaryButton>
      </Box>
      <StockRequestsStack />
    </InternalLayout>
  );
};

export default Index;
