import { gql } from '@apollo/client';
import { getInternalClient } from '@/app/utils/client';
import type {
  GetProductTagGroupQuery,
  GetProductTagGroupQueryVariables,
  UpdateProductTagGroupMutation,
  UpdateProductTagGroupMutationVariables,
} from './page.api.generated';
import type { FetchResult } from '@apollo/client';
import 'server-only';

const getProductTagGroupGql = gql`
  query GetProductTagGroup($id: Int!) {
    productTagGroup(id: $id) {
      id
      name
      productTags {
        id
        name
      }
    }
  }
`;

export const getProductTagGroup = async (
  variables: GetProductTagGroupQueryVariables,
): Promise<GetProductTagGroupQuery['productTagGroup']> => {
  const { data } = await getInternalClient().query<
    GetProductTagGroupQuery,
    GetProductTagGroupQueryVariables
  >({
    query: getProductTagGroupGql,
    variables,
  });
  return data.productTagGroup;
};

const updateProductTagGroupGql = gql`
  mutation UpdateProductTagGroup($id: Int!, $name: String!) {
    updateProductTagGroup(id: $id, name: $name) {
      id
    }
  }
`;

export const updateProductTagGroup = async (
  variables: UpdateProductTagGroupMutationVariables,
): Promise<FetchResult<UpdateProductTagGroupMutation>> =>
  await getInternalClient().mutate<
    UpdateProductTagGroupMutation,
    UpdateProductTagGroupMutationVariables
  >({
    mutation: updateProductTagGroupGql,
    variables,
  });
