import { AddIcon } from '@chakra-ui/icons';
import { Text, Box, Select } from '@chakra-ui/react';
import React, { useState, useCallback, memo } from 'react';
import { Card } from '@/components/atoms/Card';
import { CopyURL } from '@/components/atoms/CopyURL';
import { SecondaryButton } from '@/components/atoms/SecondaryButton';
import { ErrorMessage } from '@/components/molecules/ErrorMessage';
import { FlashMessage } from '@/components/molecules/FlashMessage';
import { ProductSummary } from '@/components/organisms/admin/products/ProductSummary';
import type { Product } from '@/services/api/internal_api/types';
import {
  useInternalGetProductQuery,
  useInternalGetSessionQuery,
  useInternalUpdateCartMutation,
} from '@/services/api/internal_api/types';
import type { FC } from 'react';

type Props = {
  productId: Product['id'];
};

const ProductCartItem: FC<Props> = ({ productId }) => {
  const { data: sessionData } = useInternalGetSessionQuery();
  const cart = sessionData?.session.internalUser.cart;
  const [update] = useInternalUpdateCartMutation();

  const { data, error } = useInternalGetProductQuery({
    variables: { id: productId },
    fetchPolicy: 'network-only',
  });
  const [count, setCount] = useState(1);
  const [message, setMessage] = useState('');

  const handleAddProductCartItem = useCallback(() => {
    if (cart) {
      const newItems = { ...cart.items, [productId]: { productId, count } };
      update({ variables: { id: cart.id, items: newItems } });
      setMessage('カートに追加しました');
    }
  }, [productId, cart, update, count]);

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
          {data.product.remark !== '' ? (
            <Text color="text.secondary">※ {data.product.remark}</Text>
          ) : null}
          <Box textAlign="center" mt="4">
            <Box mb="4" display="flex" alignItems="center">
              <Box flexShrink={0}>
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
              onClick={handleAddProductCartItem}
              disabled={data.product.remainingStockAmount === 0}
              w="100%"
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
const Memoed = memo(ProductCartItem);

export { Memoed as ProductCartItem };
