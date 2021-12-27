import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { Heading, Box, IconButton } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { ProductSummary } from '@/components/organisms/admin/products/edit/ProductSummary';
import { Form } from '@/components/organisms/admin/products/edit/Form';
import { Stocks } from '@/components/organisms/admin/products/edit/Stocks';
import { ProductTaggings } from '@/components/organisms/admin/products/edit/ProductTaggings';
import { InternalLayout } from '@/components/layouts/admin/InternalLayout';
import { goAdminProducts } from '@/utils/routes';

const Edit: React.VFC<Props> = () => {
  const router = useRouter();
  const { id: productId } = router.query;

  return (
    <InternalLayout>
      <Box d="flex" mb="4">
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
