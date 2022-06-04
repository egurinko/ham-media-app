import { ChevronRightIcon } from '@chakra-ui/icons';
import { Heading, Box, IconButton } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useLocalReadIsAdminQuery } from '@/api/local_api/types';
import { PrimaryButton } from '@/components/atoms/PrimaryButton';
import { InternalLayout } from '@/components/layouts/admin/InternalLayout';
import { StockRequestCartButton } from '@/components/organisms/admin/products/StockRequestCartButton';
import { ProductCartItem } from '@/components/organisms/admin/products/detail/ProductCartItem';
import { Stocks } from '@/components/organisms/admin/products/edit/Stocks';
import { goAdminProducts, ADMIN_PRODUCTS_EDIT_PATH } from '@/utils/routes';
import type { GetStaticPaths, GetStaticProps } from 'next';
import type { ParsedUrlQuery } from 'querystring';
import type { ReactElement } from 'react';

const Detail = () => {
  const router = useRouter();
  const { id: productId } = router.query;
  const { data: isAdminData } = useLocalReadIsAdminQuery();

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb="2"
      >
        <Box display="flex" mb="4">
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
              <PrimaryButton
                disabled={!isAdminData?.readIsAdmin.isAdmin}
                size="md"
              >
                商品編集
              </PrimaryButton>
            </a>
          </Link>
        ) : null}
      </Box>
      {typeof productId === 'string' ? (
        <>
          <Box mb="2">
            <ProductCartItem productId={Number(productId)} />
          </Box>
          <Box mb="2">
            <Stocks productId={Number(productId)} />
          </Box>
        </>
      ) : null}
      <StockRequestCartButton />
    </>
  );
};

Detail.getLayout = (page: ReactElement) => (
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

export default Detail;
