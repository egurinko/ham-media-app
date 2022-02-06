import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ParsedUrlQuery } from 'querystring';
import { Heading, Box, IconButton, Button } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { ProductCartItem } from '@/components/organisms/admin/products/detail/ProductCartItem';
import { InternalLayout } from '@/components/layouts/admin/InternalLayout';
import { goAdminProducts, ADMIN_PRODUCTS_EDIT_PATH } from '@/utils/routes';

const Detail: React.VFC<Props> = () => {
  const router = useRouter();
  const { id: productId } = router.query;

  return (
    <InternalLayout>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb="2"
      >
        <Box d="flex" mb="4">
          <IconButton
            aria-label="link"
            variant="link"
            onClick={() => goAdminProducts(router)}
            icon={<ChevronRightIcon />}
          />
          <Heading size="sm">商品詳細</Heading>
        </Box>
        {typeof productId === 'string' ? (
          <Link href={ADMIN_PRODUCTS_EDIT_PATH(Number(productId))}>
            <a>
              <Button
                bgColor="primary.main"
                color="white"
                size="md"
                // leftIcon={<AddIcon />}
              >
                商品編集
              </Button>
            </a>
          </Link>
        ) : null}
      </Box>
      {typeof productId === 'string' ? (
        <>
          <Box mb="2">
            <ProductCartItem productId={Number(productId)} />
          </Box>
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

export default Detail;
