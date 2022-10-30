import { AddIcon } from '@chakra-ui/icons';
import { Box } from '@chakra-ui/react';
import { CUIAutoComplete } from 'chakra-ui-autocomplete';
import { useEffect, useState, memo } from 'react';
import { PrimaryButton } from '@/components/atoms/PrimaryButton';
import { Spinner } from '@/components/atoms/Spinner';
import { ErrorMessage } from '@/components/molecules/ErrorMessage';
import { SuccessMessage } from '@/components/molecules/SuccessMessage';
import type { InternalGetProductQuery } from '@/services/api/internal_api/types';
import {
  useInternalGetProductTagGroupsQuery,
  useInternalCreateProductTaggingsMutation,
  useInternalGetProductLazyQuery,
} from '@/services/api/internal_api/types';
import type { FC } from 'react';

interface Props {
  productId: InternalGetProductQuery['product']['id'];
}

interface AutoCompleteItem {
  label: string;
  value: string;
}

const NewSection: FC<Props> = ({ productId }) => {
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
      <Spinner size="lg" loading={loading || createProductTaggingsLoading} />
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

const Memoed = memo(NewSection);

export { Memoed as NewSection };
