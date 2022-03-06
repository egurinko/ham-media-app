import { Spinner } from '@chakra-ui/react';
import { useInternalGetStocksQuery } from '@/api/internal_api/types';
import type { InternalGetProductQuery } from '@/api/internal_api/types';
import { Card } from '@/components/atoms/Card';
import { ErrorMessage } from '@/components/molecules/ErrorMessage';
import { AllocationSection } from './stock/AllocationSection';
import { NewSection } from './stock/NewSection';

interface Props {
  productId: InternalGetProductQuery['product']['id'];
}

const Stocks: React.FC<Props> = ({ productId }) => {
  const { data, error, loading, fetchMore } = useInternalGetStocksQuery({
    variables: { productId: productId },
  });

  return (
    <Card>
      {loading ? <Spinner size="lg" color="main.primary" /> : null}
      <ErrorMessage error={error} />
      {data ? (
        <AllocationSection
          productId={productId}
          stocks={data.stocks}
          fetchStocksMore={fetchMore}
        />
      ) : null}
      <NewSection productId={productId} fetchStocksMore={fetchMore} />
    </Card>
  );
};

export { Stocks };
