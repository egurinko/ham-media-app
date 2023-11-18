import { Heading, Box } from '@chakra-ui/react';
import { LinkButton } from '@/components/atoms/LinkButton';
import { InternalLayout } from '@/components/layouts/admin/InternalLayout';
import { StockRequestsStack } from '@/components/organisms/admin/stock_requests/index/StockRequestsStack';
import { ADMIN_STOCK_REQUESTS_NEW_PATH } from '@/utils/routes';
import type { ReactElement } from 'react';
const Index = () => (
  <>
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb="2"
    >
      <Heading size="sm">在庫リクエスト管理</Heading>
      <LinkButton href={ADMIN_STOCK_REQUESTS_NEW_PATH}>カートを確認</LinkButton>
    </Box>
    <StockRequestsStack />
  </>
);

Index.getLayout = (page: ReactElement) => (
  <InternalLayout>{page}</InternalLayout>
);

export default Index;
