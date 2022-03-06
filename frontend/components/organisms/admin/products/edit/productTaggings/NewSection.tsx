import { AddIcon } from '@chakra-ui/icons';
import { Spinner, Box } from '@chakra-ui/react';
import { CUIAutoComplete } from 'chakra-ui-autocomplete';
import React, { useEffect , useState } from 'react';
import {
  useInternalGetProductTagGroupsQuery,
  useInternalCreateProductTaggingsMutation,
  useInternalGetProductLazyQuery,
} from '@/api/internal_api/types';
import type { InternalGetProductQuery } from '@/api/internal_api/types';
import { PrimaryButton } from '@/components/atoms/PrimaryButton';
import { ErrorMessage } from '@/components/molecules/ErrorMessage';
import { SuccessMessage } from '@/components/molecules/SuccessMessage';

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
      <ErrorMessage error={error} />
      <SuccessMessage
        data={createProductTaggingsData}
        message="タグの紐付けに成功しました。"
      />
      <ErrorMessage error={createProductTaggingsError} />
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
