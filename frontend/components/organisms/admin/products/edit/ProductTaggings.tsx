import { Text } from '@chakra-ui/react';
import { memo } from 'react';
import { Card } from '@/components/atoms/Card';
import type { InternalGetProductQuery } from '@/services/api/internal_api/types';
import { IndexSection } from './productTaggings/IndexSection';
import { NewSection } from './productTaggings/NewSection';
import type { FC } from 'react';

interface Props {
  productId: InternalGetProductQuery['product']['id'];
}

const ProductTaggings: FC<Props> = ({ productId }) => (
  <Card>
    <Text mb="2" fontSize="lg" fontWeight="bold">
      タグ一覧
    </Text>
    <IndexSection productId={productId} />

    <Text mb="2" mt="8" fontSize="lg" fontWeight="bold">
      タグ紐付け
    </Text>
    <NewSection productId={productId} />
  </Card>
);

const Memoed = memo(ProductTaggings);

export { Memoed as ProductTaggings };
