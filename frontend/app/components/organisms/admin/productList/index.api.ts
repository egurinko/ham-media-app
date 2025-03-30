import { gql } from '@apollo/client';
import { getInternalClient } from '@/app/utils/client';
import { PRODUCT_LIST_ITEM_FIELDS } from '../productListItem/index.api';
import type {
  GetProductConnectionQuery,
  GetProductConnectionQueryVariables,
} from './index.api.generated';
import type { ApolloQueryResult } from '@apollo/client';

const getProductConnectionGql = gql`
  ${PRODUCT_LIST_ITEM_FIELDS}
  query GetProductConnection(
    $first: Int
    $after: String
    $name: String
    $makerId: Int
    $productTagId: Int
    $allocatedInternalUserId: Int
    $internalUserId: Int
    $hasStock: Boolean
  ) {
    productConnection(
      first: $first
      after: $after
      name: $name
      makerId: $makerId
      productTagId: $productTagId
      allocatedInternalUserId: $allocatedInternalUserId
      internalUserId: $internalUserId
      hasStock: $hasStock
    ) {
      edges {
        node {
          ...ProductListItemFields
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

export const getProductConnection = async (
  variables: GetProductConnectionQueryVariables,
): Promise<ApolloQueryResult<GetProductConnectionQuery>> =>
  await getInternalClient().query<
    GetProductConnectionQuery,
    GetProductConnectionQueryVariables
  >({
    query: getProductConnectionGql,
    variables,
  });
