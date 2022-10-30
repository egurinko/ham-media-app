import { Box, StatGroup, Stat, StatLabel, StatNumber } from '@chakra-ui/react';
import { memo } from 'react';
import { Spinner } from '@/components/atoms/Spinner';
import { ErrorMessage } from '@/components/molecules/ErrorMessage';
import { useInternalGetProductQuery } from '@/services/api/internal_api/types';
import type { InternalGetProductQuery } from '@/services/api/internal_api/types';
import type { FC } from 'react';

interface Props {
  productId: InternalGetProductQuery['product']['id'];
}

const ProductSummary: FC<Props> = ({ productId }) => {
  const { data, error, loading } = useInternalGetProductQuery({
    variables: { id: productId },
  });
  return (
    <Box>
      <Spinner size="lg" loading={loading} />
      <ErrorMessage error={error} />
      {data ? (
        <StatGroup
          border="1px"
          borderColor="border.gray"
          borderRadius="5"
          p="2"
          textAlign="center"
        >
          <Stat>
            <StatLabel>総在庫</StatLabel>
            <StatNumber>{data.product.totalStockAmount}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>貸出数</StatLabel>
            <StatNumber>{data.product.allocatedStockAmount}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>残数</StatLabel>
            <StatNumber>{data.product.remainingStockAmount}</StatNumber>
          </Stat>
        </StatGroup>
      ) : null}
    </Box>
  );
};

const Memoed = memo(ProductSummary);

export { Memoed as ProductSummary };
