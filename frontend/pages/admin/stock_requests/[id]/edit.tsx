import { ChevronRightIcon } from '@chakra-ui/icons';
import { Heading, Box, IconButton } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { InternalLayout } from '@/components/layouts/admin/InternalLayout';
import { StockRequestCartButton } from '@/components/organisms/admin/products/StockRequestCartButton';
import { Form } from '@/components/organisms/admin/stock_requests/edit/Form';
import { Review } from '@/components/organisms/admin/stock_requests/edit/Review';
import { goAdminStockRequests } from '@/utils/routes';
import type { GetStaticPaths, GetStaticProps } from 'next';
import type { ParsedUrlQuery } from 'querystring';

const Edit: React.VFC<NoProps> = () => {
  const router = useRouter();
  const { id: stockRequestId } = router.query;

  return (
    <InternalLayout>
      <Box d="flex" alignItems="center">
        <IconButton
          aria-label="link"
          variant="link"
          onClick={() => goAdminStockRequests(router)}
          icon={<ChevronRightIcon />}
        />
        <Heading size="sm">在庫リクエスト編集</Heading>
      </Box>
      {typeof stockRequestId === 'string' ? (
        <>
          <Box mb="2">
            <Review stockRequestId={Number(stockRequestId)} />
          </Box>
          <Box mb="2">
            <Form stockRequestId={Number(stockRequestId)} />
          </Box>
        </>
      ) : null}
      <StockRequestCartButton />
    </InternalLayout>
  );
};

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => ({
  paths: [],
  fallback: 'blocking',
});

export const getStaticProps: GetStaticProps<NoProps, Params> = async () => ({
  props: {},
});

export default Edit;
