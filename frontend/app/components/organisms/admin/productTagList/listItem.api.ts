import { gql } from '@apollo/client';
import { getInternalClient } from '@/app/utils/client';
import type {
  DeleteProductTagMutation,
  DeleteProductTagMutationVariables,
  UpdateProductTagMutation,
  UpdateProductTagMutationVariables,
} from './listItem.api.generated';
import type { FetchResult } from '@apollo/client';
import 'server-only';

export const PRODUCT_TAG_LIST_ITEM_FIELDS = gql`
  fragment ProductTagListItemFields on ProductTag {
    id
    name
  }
`;

const deleteProductTagGql = gql`
  mutation DeleteProductTag($id: Int!) {
    deleteProductTag(id: $id) {
      deleted
    }
  }
`;

export const deleteProductTag = async (
  variables: DeleteProductTagMutationVariables,
): Promise<FetchResult<DeleteProductTagMutation>> =>
  await getInternalClient().mutate<
    DeleteProductTagMutation,
    DeleteProductTagMutationVariables
  >({
    mutation: deleteProductTagGql,
    variables,
  });

const updateProductTagGql = gql`
  mutation UpdateProductTag($id: Int!, $name: String!) {
    updateProductTag(id: $id, name: $name) {
      id
      name
    }
  }
`;

export const updateProductTag = async (
  variables: UpdateProductTagMutationVariables,
): Promise<FetchResult<UpdateProductTagMutation>> =>
  await getInternalClient().mutate<
    UpdateProductTagMutation,
    UpdateProductTagMutationVariables
  >({
    mutation: updateProductTagGql,
    variables,
  });
