import { useState, useEffect, useCallback } from 'react';
import { Box, Text, Select, Button } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { Card } from '@/components/atoms/Card';
import { FlashMessage } from '@/components/molecules/FlashMessage';
import { ProductSummary } from '@/components/organisms/admin/products/ProductSummary';
import {
  useLocalGetProductCartItemsQuery,
  useInternalGetProductsQuery,
} from '@/api/internal_api/types';
import type { ProductFieldsFragment } from '@/api/internal_api/types';
import { productCartItemsVar } from '@/utils/apollo/cache';

type RequestProduct = {
  count: number;
  product: ProductFieldsFragment;
};

const Form: React.VFC<NoProps> = () => {
  const { data: cartItemsData, error } = useLocalGetProductCartItemsQuery();
  const productIds =
    cartItemsData?.productCartItems.map((item) => item.productId) || [];
  const { data: productsData } = useInternalGetProductsQuery({
    variables: { ids: productIds },
  });
  const [requestProducts, setRequestProducts] = useState<RequestProduct[]>([]);

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

  return (
    <Card>
      {error ? <FlashMessage message={error.message} status="error" /> : null}
      {requestProducts
        ? requestProducts.map((requestProduct) => (
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
          ))
        : null}
    </Card>
  );
};

export { Form };
