import { Spinner, Select, Box, Button } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { FlashMessage } from '@/components/molecules/FlashMessage';
import {
  useInternalGetProductTagGroupsQuery,
  useInternalCreateProductTaggingsMutation,
  useInternalGetProductLazyQuery,
} from '@/api/internal_api/types';
import type { InternalGetProductQuery } from '@/api/internal_api/types';
import React, { useState } from 'react';

interface Props {
  productId: InternalGetProductQuery['product']['id'];
}

const NewSection: React.FC<Props> = ({ productId }) => {
  const [selectedProductTag, setSelectedProductTag] = useState<
    undefined | number
  >(undefined);
  const { data, loading, error } = useInternalGetProductTagGroupsQuery();
  const [
    createProductTaggings,
    {
      data: createProductTaggingsData,
      error: createProductTaggingsError,
      loading: createProductTaggingsLoading,
    },
  ] = useInternalCreateProductTaggingsMutation();
  const [getProducts] = useInternalGetProductLazyQuery({
    variables: { id: productId },
    fetchPolicy: 'network-only',
  });

  const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProductTag(Number(e.target.value));
  };

  const handleAddProductTaggings = async () => {
    if (selectedProductTag) {
      await createProductTaggings({
        variables: { productId, productTagIds: [selectedProductTag] },
      });
      await getProducts();
    }
  };

  return (
    <>
      {loading || createProductTaggingsLoading ? (
        <Spinner size="lg" color="main.primary" />
      ) : null}
      {error ? (
        <FlashMessage status="error" message="タグの取得に失敗しました。" />
      ) : null}
      {createProductTaggingsData ? (
        <FlashMessage status="success" message="タグの紐付けに成功しました。" />
      ) : createProductTaggingsError ? (
        <FlashMessage status="error" message="タグの紐付けに失敗しました。" />
      ) : null}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddProductTaggings();
        }}
      >
        {data ? (
          <Select
            placeholder="紐付けるタグを選んでください。"
            onChange={handleTagChange}
            value={selectedProductTag}
            required
          >
            {data.productTagGroups.map((productTagGroup) =>
              productTagGroup.productTags.map((productTag) => (
                <option key={productTag.id} value={productTag.id}>
                  {productTag.name}
                </option>
              ))
            )}
          </Select>
        ) : null}
        <Box textAlign="center" mt="8">
          <Button
            type="submit"
            bgColor="primary.main"
            aria-label="add"
            color="white"
            leftIcon={<AddIcon />}
            isLoading={createProductTaggingsLoading}
          >
            タグ紐付け
          </Button>
        </Box>
      </form>
    </>
  );
};

export { NewSection };
