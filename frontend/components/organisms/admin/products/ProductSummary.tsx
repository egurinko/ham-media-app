import { Text, Box } from '@chakra-ui/react';
import React from 'react';
import type { ProductFieldsFragment } from '@/api/internal_api/types';
import { SecondaryTag } from '@/components/atoms/SecondaryTag';

type Props = {
  product: ProductFieldsFragment;
};

const ProductSummary: React.VFC<Props> = ({ product }) => (
  <Box w="100%" display="flex" flexDirection="row" alignItems="center" p="2">
    <Box flex="1" display="flex" flexDir="row" alignItems="center">
      <Box flexShrink="0" mr="1">
        <img
          src={product.url}
          alt={product.name}
          width="80"
          height="80"
          style={{
            objectFit: 'contain',
            width: '80px',
            height: '80px',
          }}
        />
      </Box>
      <Box textAlign="left" flexShrink="1">
        <Text fontSize="xs">{product.maker.name}</Text>
        <Text fontSize="sm" mb="2" fontWeight="bold">
          {product.name}
        </Text>
        {product.productTaggings.map((productTagging) => (
          <SecondaryTag key={productTagging.id} fontSize="xs" mr="1" mb="2">
            {productTagging.productTag.name}
          </SecondaryTag>
        ))}
        <Text fontSize="xs" mb="2">
          割当：
          {Array.from(
            new Set(
              product.stocks
                .filter((s) => s.stockAllocation)
                .map((s) => s.stockAllocation?.internalUser.name)
            )
          ).join(', ')}
        </Text>
      </Box>
    </Box>
    <Box ml="2">
      <Text fontSize="sm">総在庫：{product.totalStockAmount}</Text>
      <Text fontSize="sm">貸出数：{product.allocatedStockAmount}</Text>
      <Text fontSize="sm">残数：{product.remainingStockAmount}</Text>
    </Box>
  </Box>
);

export { ProductSummary };
