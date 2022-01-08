import React from 'react';
import { Text, Box, Tag } from '@chakra-ui/react';
import type { Product } from '@/api/internal_api/types';
import { SummaryLink } from '@/components/molecules/SummaryLink';

type Props = {
  product: Product;
};

const ProductSummary: React.VFC<Props> = ({ product }) => {
  return (
    <SummaryLink url={`/admin/products/${product.id}/edit`}>
      <Box
        w="100%"
        display="flex"
        flexDirection="row"
        alignItems="center"
        p="2"
      >
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
          <Box flexShrink="1">
            <Text fontSize="xs">{product.maker.name}</Text>
            <Text fontSize="sm" mb="2" fontWeight="bold">
              {product.name}
            </Text>
            {product.productTaggings.map((productTagging) => (
              <Tag
                key={productTagging.id}
                bgColor="primary.light"
                color="primary.main"
                fontSize="xs"
                mr="1"
                mb="2"
              >
                {productTagging.productTag.name}
              </Tag>
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
    </SummaryLink>
  );
};

export { ProductSummary };
