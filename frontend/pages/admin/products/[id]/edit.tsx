import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { Heading, Box, IconButton } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Form } from '@/components/organisms/admin/products/edit/Form';
import { InternalLayout } from '@/components/layouts/admin/InternalLayout';
import { getProductIds } from '@/api/internal_api/getProductIds';
import type { InternalGetProductIdsQuery } from '@/api/internal_api/types';
import { apiClient } from '@/utils/apollo';
import { goAdminMakers } from '@/utils/routes';

const Edit: React.VFC<Props> = () => {
  const router = useRouter();
  const { id: productId } = router.query;

  return (
    <InternalLayout>
      <Box d="flex" mb="4">
        <IconButton
          aria-label="link"
          variant="link"
          onClick={() => goAdminMakers(router)}
          icon={<ChevronRightIcon />}
        />
        <Heading size="sm">商品編集</Heading>
      </Box>
      {typeof productId === 'string' ? (
        <Form productId={Number(productId)} />
      ) : null}
    </InternalLayout>
  );
};

interface Params extends ParsedUrlQuery {
  id: string;
}

interface Props {}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const { data } = await apiClient.query<InternalGetProductIdsQuery>({
    query: getProductIds,
  });

  const paths = data.products.map((product) => ({
    params: { id: String(product.id) },
  }));

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps<Props, Params> = async () => {
  return { props: {} };
};

export default Edit;
