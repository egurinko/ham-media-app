import { gql } from '@apollo/client';
import { PRODUCT_LIST_ITEM_FIELDS } from '@/app/components/organisms/admin/productListItem/index.api';
import { getInternalClient } from '@/app/utils/client';
import type {
  GetProductsByIdsQuery,
  GetProductsByIdsQueryVariables,
  CreateStockRequestMutation,
  CreateStockRequestMutationVariables,
} from './index.api.generated';
import type { FetchResult } from '@apollo/client';

const getProductsByIdsGql = gql`
  ${PRODUCT_LIST_ITEM_FIELDS}
  query GetProductsByIds($ids: [Int!]) {
    products(ids: $ids) {
      ...ProductListItemFields
    }
  }
`;

export const getProductsByIds = async (
  variables: GetProductsByIdsQueryVariables,
): Promise<GetProductsByIdsQuery['products']> => {
  const { data } = await getInternalClient().query<
    GetProductsByIdsQuery,
    GetProductsByIdsQueryVariables
  >({
    query: getProductsByIdsGql,
    variables,
  });

  return data.products;
};

const createStockRequestGql = gql`
  mutation CreateStockRequest(
    $requestProducts: [CreateStockRequestRequestProductsInputType!]!
  ) {
    createStockRequest(requestProducts: $requestProducts) {
      id
    }
  }
`;

export const createStockRequest = async (
  variables: CreateStockRequestMutationVariables,
): Promise<FetchResult<CreateStockRequestMutation>> =>
  await getInternalClient().mutate<
    CreateStockRequestMutation,
    CreateStockRequestMutationVariables
  >({
    mutation: createStockRequestGql,
    variables,
  });
