import { memo } from 'react';
import { useInternalGetStocksQuery } from '@/api/internal_api/types';
import type { InternalGetProductQuery } from '@/api/internal_api/types';
import { Card } from '@/components/atoms/Card';
import { Spinner } from '@/components/atoms/Spinner';
import { ErrorMessage } from '@/components/molecules/ErrorMessage';
import { AllocationSection } from './stock/AllocationSection';
import { NewSection } from './stock/NewSection';
import type { FC } from 'react';

interface Props {
  productId: InternalGetProductQuery['product']['id'];
}

const Stocks: FC<Props> = ({ productId }) => {
  const { data, error, loading, fetchMore } = useInternalGetStocksQuery({
    variables: { productId: productId },
  });

  return (
    <Card>
      <Spinner size="lg" loading={loading} />
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

const Memoed = memo(Stocks);

export { Memoed as Stocks };
