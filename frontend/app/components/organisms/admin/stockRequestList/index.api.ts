import { gql } from '@apollo/client';
import { STOCK_REQUEST_LIST_ITEM_FIELDS } from '@/app/components/organisms/admin/stockRequestListItem/index.api';
import type { StockRequestListItemFieldsFragment } from '@/app/components/organisms/admin/stockRequestListItem/index.api.generated';
import { getInternalClient } from '@/app/utils/client';
import { getNodesFromConnectionEdges } from '@/app/utils/connection';
import type {
  GetStockRequestConnectionQuery,
  GetStockRequestConnectionQueryVariables,
} from './index.api.generated';

const getStockRequestConnectionGql = gql`
  ${STOCK_REQUEST_LIST_ITEM_FIELDS}
  query GetStockRequestConnection(
    $first: Int
    $after: String
    $internalUserId: BigInt
  ) {
    stockRequestConnection(
      first: $first
      after: $after
      internalUserId: $internalUserId
    ) {
      edges {
        node {
          ...StockRequestListItemFields
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

export const getStockRequestConnection = async (
  variables: GetStockRequestConnectionQueryVariables,
): Promise<{
  stockRequests: StockRequestListItemFieldsFragment[];
  pageInfo: NonNullable<
    GetStockRequestConnectionQuery['stockRequestConnection']
  >['pageInfo'];
}> => {
  const { data } = await getInternalClient().query<
    GetStockRequestConnectionQuery,
    GetStockRequestConnectionQueryVariables
  >({
    query: getStockRequestConnectionGql,
    variables,
  });

  return {
    stockRequests: getNodesFromConnectionEdges(
      data.stockRequestConnection?.edges,
    ),
    pageInfo: data.stockRequestConnection!.pageInfo,
  };
};
