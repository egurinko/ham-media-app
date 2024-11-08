import { DeleteIcon } from '@chakra-ui/icons';
import { Box, Text, Select, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState, useEffect, useCallback, memo } from 'react';
import { Card } from '@/components/atoms/Card';
import { PrimaryButton } from '@/components/atoms/PrimaryButton';
import { Spinner } from '@/components/atoms/Spinner';
import { ErrorMessage } from '@/components/molecules/ErrorMessage';
import { SuccessMessage } from '@/components/molecules/SuccessMessage';
import { ProductSummary } from '@/components/organisms/admin/products/ProductSummary';
import type { ProductFieldsFragment } from '@/services/api/internal_api/types';
import {
  useInternalGetProductsQuery,
  useInternalCreateStockRequestMutation,
  useInternalGetSessionQuery,
  useInternalUpdateCartMutation,
} from '@/services/api/internal_api/types';
import { goAdminStockRequests } from '@/utils/routes';
import { Note } from '../shared/Note';
import { Empty } from './Empty';
import type { FC } from 'react';

type RequestProduct = {
  count: number;
  product: ProductFieldsFragment;
};

const Form: FC<NoProps> = () => {
  const router = useRouter();
  const [update] = useInternalUpdateCartMutation();
  const { data: sessionData } = useInternalGetSessionQuery();
  const cart = sessionData?.session.internalUser.cart;
  const productIds = cart
    ? Object.keys(cart.items).map((key) => Number(key))
    : [];
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
    if (cart && productsData) {
      const tmp = Object.values(cart.items)
        .map((item) => {
          const product = productsData.products.find(
            (p) => p.id === item.productId,
          );
          return {
            count: item.count,
            product,
          };
        })
        .filter(
          (requestProduct): requestProduct is RequestProduct =>
            !!requestProduct.product,
        );
      setRequestProducts(tmp);
    }
  }, [cart, productsData]);

  const handleChangeCount = useCallback(
    (count: number, product: ProductFieldsFragment) => {
      if (cart) {
        const newItems = {
          ...cart.items,
          [product.id]: { productId: product.id, count },
        };
        update({ variables: { id: cart.id, items: newItems } });
      }
    },
    [update, cart],
  );

  const handleDelete = useCallback(
    (product: ProductFieldsFragment) => {
      if (cart) {
        const newItems = Object.values(cart.items)
          .filter((item) => item.productId !== product.id)
          .reduce((acc, item) => ({ ...acc, [item.productId]: item }), {});
        update({ variables: { id: cart.id, items: newItems } });
      }
    },
    [cart, update],
  );

  const handleSubmit = async () => {
    if (cart) {
      const cartItems = Object.values(cart.items);
      await create({ variables: { requestProducts: cartItems } });
      update({ variables: { id: cart.id, items: {} as JSON } });
      await fetchMore({ variables: { productIds: [] } });
      goAdminStockRequests(router);
    }
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
                <Box flexShrink={0}>
                  <Text>数量：</Text>
                </Box>
                <Select
                  value={requestProduct.count}
                  onChange={(e) =>
                    handleChangeCount(
                      Number(e.target.value),
                      requestProduct.product,
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

const Memoed = memo(Form);

export { Memoed as Form };
