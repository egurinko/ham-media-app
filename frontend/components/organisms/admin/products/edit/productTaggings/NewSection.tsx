import { useEffect } from 'react';
import { Spinner, Box } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { CUIAutoComplete } from 'chakra-ui-autocomplete';
import { PrimaryButton } from '@/components/atoms/PrimaryButton';
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

interface AutoCompleteItem {
  label: string;
  value: string;
}

const NewSection: React.FC<Props> = ({ productId }) => {
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

  const handleAddProductTaggings = async () => {
    if (selectedItems) {
      const productTagIds = selectedItems.map((i) => Number(i.value));
      await createProductTaggings({
        variables: { productId, productTagIds },
      });
      await getProducts();
      setSelectedItems([]);
    }
  };

  const [productTags, setProductTags] = useState<AutoCompleteItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<AutoCompleteItem[]>([]);

  useEffect(() => {
    if (data) {
      const tags = data.productTagGroups
        .map((productTagGroup) => productTagGroup.productTags.flat())
        .flat()
        .map((productTag) => ({
          label: productTag.name,
          value: String(productTag.id),
        }));
      setProductTags(tags);
    }
  }, [data]);

  const handleSelectedItemsChange = (selectedItems?: AutoCompleteItem[]) => {
    if (selectedItems) {
      setSelectedItems(selectedItems);
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
          <CUIAutoComplete
            label=""
            placeholder="紐付けるタグを選んでください。"
            items={productTags}
            selectedItems={selectedItems}
            onSelectedItemsChange={(changes) =>
              handleSelectedItemsChange(changes.selectedItems)
            }
            disableCreateItem={true}
          />
        ) : null}
        <Box textAlign="center" mt="8">
          <PrimaryButton
            type="submit"
            aria-label="add"
            leftIcon={<AddIcon />}
            isLoading={createProductTaggingsLoading}
          >
            タグ紐付け
          </PrimaryButton>
        </Box>
      </form>
    </>
  );
};

export { NewSection };
