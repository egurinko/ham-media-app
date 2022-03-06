import { SmallCloseIcon } from '@chakra-ui/icons';
import { Spinner } from '@chakra-ui/react';
import {
  useInternalGetProductQuery,
  useInternalDeleteProductTaggingMutation,
} from '@/api/internal_api/types';
import type { InternalGetProductQuery } from '@/api/internal_api/types';
import { PrimaryTag } from '@/components/atoms/PrimaryTag';
import { ErrorMessage } from '@/components/molecules/ErrorMessage';
import { SuccessMessage } from '@/components/molecules/SuccessMessage';

interface Props {
  productId: InternalGetProductQuery['product']['id'];
}

const IndexSection: React.FC<Props> = ({ productId }) => {
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
      {loading || deleteProductTaggingLoading ? (
        <Spinner size="lg" color="main.primary" />
      ) : null}
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

export { IndexSection };
