import { Text } from '@chakra-ui/react';
import type { InternalGetProductQuery } from '@/api/internal_api/types';
import { Card } from '@/components/atoms/Card';
import { IndexSection } from './productTaggings/IndexSection';
import { NewSection } from './productTaggings/NewSection';

interface Props {
  productId: InternalGetProductQuery['product']['id'];
}

const ProductTaggings: React.FC<Props> = ({ productId }) => (
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

export { ProductTaggings };
