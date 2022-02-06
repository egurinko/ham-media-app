import React from 'react';
import { Text, Box, Tag } from '@chakra-ui/react';
import { Card } from '@/components/atoms/Card';
import { ProductSummary } from '@/components/organisms/admin/products/ProductSummary';
import { useInternalGetProductQuery } from '@/api/internal_api/types';
import type { Product } from '@/api/internal_api/types';

type Props = {
  productId: Product['id'];
};

const ProductCartItem: React.VFC<Props> = ({ productId }) => {
  const { data, error } = useInternalGetProductQuery({
    variables: { id: productId },
  });

  return (
    <Card>
      {data?.product ? (
        <ProductSummary product={data.product}></ProductSummary>
      ) : null}
    </Card>
  );
};

export { ProductCartItem };
