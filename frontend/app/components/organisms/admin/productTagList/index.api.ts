import { gql } from '@apollo/client';
import { getInternalClient } from '@/app/utils/client';
import { PRODUCT_TAG_LIST_ITEM_FIELDS } from './listItem.api';
import type {
  GetProductTagsQuery,
  GetProductTagsQueryVariables,
} from './index.api.generated';

const getProductTagsGql = gql`
  ${PRODUCT_TAG_LIST_ITEM_FIELDS}
  query GetProductTags($productTagGroupId: Int!) {
    productTagGroup(id: $productTagGroupId) {
      productTags {
        ...ProductTagListItemFields
      }
    }
  }
`;

export const getProductTags = async (
  variables: GetProductTagsQueryVariables,
): Promise<GetProductTagsQuery['productTagGroup']['productTags']> => {
  const { data } = await getInternalClient().query<
    GetProductTagsQuery,
    GetProductTagsQueryVariables
  >({
    query: getProductTagsGql,
    variables,
  });
  return data.productTagGroup.productTags;
};
