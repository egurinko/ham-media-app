import {
  Box,
  Spinner,
  StatGroup,
  Stat,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react';
import { ErrorMessage } from '@/components/molecules/ErrorMessage';
import { useInternalGetProductQuery } from '@/api/internal_api/types';
import type { InternalGetProductQuery } from '@/api/internal_api/types';

interface Props {
  productId: InternalGetProductQuery['product']['id'];
}

const ProductSummary: React.FC<Props> = ({ productId }) => {
  const { data, error, loading } = useInternalGetProductQuery({
    variables: { id: productId },
  });
  return (
    <Box>
      {loading ? <Spinner size="lg" color="main.primary" /> : null}
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

export { ProductSummary };
