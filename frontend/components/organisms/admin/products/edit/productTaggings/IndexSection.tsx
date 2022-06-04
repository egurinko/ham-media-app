import { SmallCloseIcon } from '@chakra-ui/icons';
import { memo } from 'react';
import {
  useInternalGetProductQuery,
  useInternalDeleteProductTaggingMutation,
} from '@/api/internal_api/types';
import type { InternalGetProductQuery } from '@/api/internal_api/types';
import { PrimaryTag } from '@/components/atoms/PrimaryTag';
import { Spinner } from '@/components/atoms/Spinner';
import { ErrorMessage } from '@/components/molecules/ErrorMessage';
import { SuccessMessage } from '@/components/molecules/SuccessMessage';
import type { FC } from 'react';

interface Props {
  productId: InternalGetProductQuery['product']['id'];
}

const IndexSection: FC<Props> = ({ productId }) => {
  const { data, error, loading, fetchMore } = useInternalGetProductQuery({
    variables: { id: productId },
    fetchPolicy: 'network-only',
  });
  const [
    deleteProductTagging,
    {
      data: deleteProductTaggingData,
      error: deleteProductTaggingError,
      loading: deleteProductTaggingLoading,
    },
  ] = useInternalDeleteProductTaggingMutation();

  const handleDeleteProductTagging = async (id: number) => {
    await deleteProductTagging({ variables: { id } });
    await fetchMore({ variables: { id: productId } });
  };

  return (
    <>
      <Spinner size="lg" loading={loading || deleteProductTaggingLoading} />

      <ErrorMessage error={error} />
      <SuccessMessage
        data={deleteProductTaggingData}
        message="タグの紐付けを解除しました。"
      />
      <ErrorMessage error={deleteProductTaggingError} />
      {data
        ? data.product.productTaggings.map((productTagging) => (
            <PrimaryTag
              key={productTagging.id}
              m="2"
              _hover={{
                opacity: 0.8,
              }}
            >
              {productTagging.productTag.name}
              <SmallCloseIcon
                onClick={() => handleDeleteProductTagging(productTagging.id)}
              />
            </PrimaryTag>
          ))
        : null}
    </>
  );
};

const Memoed = memo(IndexSection);

export { Memoed as IndexSection };
