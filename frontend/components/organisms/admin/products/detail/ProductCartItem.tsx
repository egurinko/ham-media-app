import { AddIcon } from '@chakra-ui/icons';
import { Text, Box, Select } from '@chakra-ui/react';
import React, { useState, useCallback } from 'react';
import { useInternalGetProductQuery } from '@/api/internal_api/types';
import type { Product } from '@/api/internal_api/types';
import { Card } from '@/components/atoms/Card';
import { CopyURL } from '@/components/atoms/CopyURL';
import { SecondaryButton } from '@/components/atoms/SecondaryButton';
import { ErrorMessage } from '@/components/molecules/ErrorMessage';
import { FlashMessage } from '@/components/molecules/FlashMessage';
import { ProductSummary } from '@/components/organisms/admin/products/ProductSummary';
import { productCartItemsVar } from '@/utils/apollo/cache';

type Props = {
  productId: Product['id'];
};

const ProductCartItem: React.VFC<Props> = ({ productId }) => {
  const { data, error } = useInternalGetProductQuery({
    variables: { id: productId },
  });
  const [count, setCount] = useState(1);
  const [message, setMessage] = useState('');

  const handleAddProductCartItem = useCallback(() => {
    const productCartItems = productCartItemsVar();
    const hasProduct = productCartItems.some(
      (item) => item.productId === productId
    );
    if (hasProduct) {
      const newProductCartItems = productCartItems.map((item) => {
        if (item.productId === productId) {
          return { count: item.count + count, productId: item.productId };
        }
        return item;
      });
      productCartItemsVar(newProductCartItems);
    } else {
      productCartItemsVar([...productCartItemsVar(), { count, productId }]);
    }
    setMessage('カートに追加しました');
  }, [productId, count]);

  return (
    <Card>
      <ErrorMessage error={error} />
      {message !== '' ? (
        <FlashMessage message={message} status="success" />
      ) : null}
      {data?.product ? (
        <>
          <CopyURL />
          <ProductSummary product={data.product}></ProductSummary>
          <Box textAlign="center" mt="4">
            <Box mb="4" display="flex" alignItems="center">
              <Box flexShrink="0">
                <Text>数量：</Text>
              </Box>
              <Select
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
              >
                {Array(data.product.remainingStockAmount)
                  .fill('')
                  .map((_, i) => (
                    <option key={String(i)} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
              </Select>
            </Box>
            <SecondaryButton
              mb="2"
              isFullWidth
              onClick={handleAddProductCartItem}
              disabled={data.product.remainingStockAmount === 0}
            >
              <AddIcon mr="1" />
              在庫リクエストに入れる
            </SecondaryButton>
            <Text fontSize="xs" color="text.secondary">
              ※残数がない場合リクエストできません
            </Text>
          </Box>
        </>
      ) : null}
    </Card>
  );
};

export { ProductCartItem };
