import { DeleteIcon } from '@chakra-ui/icons';
import { Box, Text, Select, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState, useEffect, useCallback } from 'react';
import {
  useLocalGetProductCartItemsQuery,
  useInternalGetProductsQuery,
  useInternalCreateStockRequestMutation,
} from '@/api/internal_api/types';
import type { ProductFieldsFragment } from '@/api/internal_api/types';
import { Card } from '@/components/atoms/Card';
import { PrimaryButton } from '@/components/atoms/PrimaryButton';
import { Spinner } from '@/components/atoms/Spinner';
import { ErrorMessage } from '@/components/molecules/ErrorMessage';
import { SuccessMessage } from '@/components/molecules/SuccessMessage';
import { ProductSummary } from '@/components/organisms/admin/products/ProductSummary';
import { productCartItemsVar } from '@/utils/apollo/cache';
import { goAdminStockRequests } from '@/utils/routes';
import { Note } from '../shared/Note';
import { Empty } from './Empty';

type RequestProduct = {
  count: number;
  product: ProductFieldsFragment;
};

const Form: React.VFC<NoProps> = () => {
  const router = useRouter();
  const { data: cartItemsData } = useLocalGetProductCartItemsQuery();
  const productIds =
    cartItemsData?.productCartItems.map((item) => item.productId) || [];
  const {
    data: productsData,
    loading: productsLoading,
    fetchMore,
  } = useInternalGetProductsQuery({
    variables: { ids: productIds },
  });
  const [requestProducts, setRequestProducts] = useState<RequestProduct[]>([]);
  const [create, { data, loading, error }] =
    useInternalCreateStockRequestMutation();

  useEffect(() => {
    if (cartItemsData && productsData) {
      const tmp = cartItemsData.productCartItems
        .map((item) => {
          const product = productsData.products.find(
            (p) => p.id === item.productId
          );
          return {
            count: item.count,
            product,
          };
        })
        .filter(
          (requestProduct): requestProduct is RequestProduct =>
            !!requestProduct.product
        );
      setRequestProducts(tmp);
    }
  }, [cartItemsData, productsData]);

  const handleChangeCount = useCallback(
    (count: number, product: ProductFieldsFragment) => {
      const prevProductCartItems = productCartItemsVar();
      const changedCartItems = prevProductCartItems.map((item) => {
        if (item.productId === product.id) {
          return { ...item, count };
        }
        return item;
      });
      productCartItemsVar(changedCartItems);
    },
    []
  );

  const handleDelete = useCallback((product: ProductFieldsFragment) => {
    const prevProductCartItems = productCartItemsVar();
    const deletedCartItems = prevProductCartItems.filter(
      (item) => item.productId !== product.id
    );
    productCartItemsVar(deletedCartItems);
  }, []);

  const handleSubmit = async () => {
    const cartItems = productCartItemsVar();
    await create({ variables: { requestProducts: cartItems } });
    productCartItemsVar([]);
    await fetchMore({ variables: { productIds: [] } });
    goAdminStockRequests(router);
  };

  return (
    <Card>
      <SuccessMessage
        data={data}
        message="在庫リクエストを行いました。少々お待ちください。"
      />
      <ErrorMessage error={error} />
      {productsLoading ? (
        <Spinner loading={productsLoading} />
      ) : requestProducts.length === 0 ? (
        <Empty />
      ) : null}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Box textAlign="center">
          {requestProducts.map((requestProduct) => (
            <Box key={requestProduct.product.id} mb="2">
              <ProductSummary product={requestProduct.product} />
              <Box display="flex" alignItems="center">
                <Box flexShrink="0">
                  <Text>数量：</Text>
                </Box>
                <Select
                  value={requestProduct.count}
                  onChange={(e) =>
                    handleChangeCount(
                      Number(e.target.value),
                      requestProduct.product
                    )
                  }
                >
                  {Array(requestProduct.product.remainingStockAmount)
                    .fill('')
                    .map((_, i) => (
                      <option key={String(i)} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                </Select>
                <Button
                  ml="2"
                  onClick={() => handleDelete(requestProduct.product)}
                >
                  <DeleteIcon mr="1" />
                  削除
                </Button>
              </Box>
            </Box>
          ))}

          <Note />

          <PrimaryButton
            type="submit"
            isLoading={loading}
            mt="8"
            disabled={requestProducts.length === 0}
          >
            在庫リクエストをする
          </PrimaryButton>
        </Box>
      </form>
    </Card>
  );
};

export { Form };
