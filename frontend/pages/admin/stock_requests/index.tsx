import { Heading, Box, Button } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
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
        <Button
          bgColor="primary.main"
          color="white"
          size="md"
          leftIcon={<AddIcon />}
          onClick={() => goAdminStockRequestsNew(router)}
        >
          新規登録
        </Button>
      </Box>
      <StockRequestsStack />
    </InternalLayout>
  );
};

export default Index;
