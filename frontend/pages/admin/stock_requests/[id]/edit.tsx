import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { Heading, Box, IconButton } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Form } from '@/components/organisms/admin/stock_requests/edit/Form';
import { Review } from '@/components/organisms/admin/stock_requests/edit/Review';
import { InternalLayout } from '@/components/layouts/admin/InternalLayout';
import { StockRequestCartButton } from '@/components/organisms/admin/products/StockRequestCartButton';
import { goAdminStockRequests } from '@/utils/routes';

const Edit: React.VFC<Props> = () => {
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

interface Props {}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  return { paths: [], fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps<Props, Params> = async () => {
  return { props: {} };
};

export default Edit;
