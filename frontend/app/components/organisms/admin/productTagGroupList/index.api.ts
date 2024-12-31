import { gql } from '@apollo/client';
import { getInternalClient } from '@/app/utils/client';
import { PRODUCT_TAG_GROUP_LIST_ITEM_FIELDS } from './listItem.api';
import type {
  GetProductTagGroupsQuery,
  GetProductTagGroupsQueryVariables,
} from './index.api.generated';

const getProductTagGroupsGql = gql`
  ${PRODUCT_TAG_GROUP_LIST_ITEM_FIELDS}
  query GetProductTagGroups {
    productTagGroups {
      ...ProductTagGroupListItemFields
    }
  }
`;

export const getProductTagGroups = async (
  variables: GetProductTagGroupsQueryVariables,
): Promise<GetProductTagGroupsQuery['productTagGroups']> => {
  const { data } = await getInternalClient().query<
    GetProductTagGroupsQuery,
    GetProductTagGroupsQueryVariables
  >({
    query: getProductTagGroupsGql,
    variables,
  });
  return data.productTagGroups;
};
