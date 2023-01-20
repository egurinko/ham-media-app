import { ChevronRightIcon } from '@chakra-ui/icons';
import { Heading, Box, IconButton } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { InternalLayout } from '@/components/layouts/admin/InternalLayout';
import { StockRequestCartButton } from '@/components/organisms/admin/products/StockRequestCartButton';
import { Form } from '@/components/organisms/admin/products/edit/Form';
import { ProductSummary } from '@/components/organisms/admin/products/edit/ProductSummary';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { ProductTaggings } from '@/components/organisms/admin/products/edit/ProductTaggings';
import type { ParsedUrlQuery } from 'querystring';
import { Stocks } from '@/components/organisms/admin/products/edit/Stocks';
import type { ReactElement } from 'react';
import { goAdminProducts } from '@/utils/routes';

const Edit = () => {
  const router = useRouter();
  const { id: productId } = router.query;

  return (
    <>
      <Box display="flex" mb="4">
        <IconButton
          aria-label="link"
          variant="link"
          onClick={() => goAdminProducts(router)}
          icon={<ChevronRightIcon />}
        />
        <Heading size="sm">商品編集</Heading>
      </Box>
      {typeof productId === 'string' ? (
        <>
          <Box mb="2">
            <ProductSummary productId={Number(productId)} />
          </Box>
          <Box mb="2">
            <Form productId={Number(productId)} />
          </Box>
          <Box mb="2">
            <Stocks productId={Number(productId)} />
          </Box>
          <ProductTaggings productId={Number(productId)} />
        </>
      ) : null}
      <StockRequestCartButton />
    </>
  );
};

Edit.getLayout = (page: ReactElement) => (
  <InternalLayout>{page}</InternalLayout>
);

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
