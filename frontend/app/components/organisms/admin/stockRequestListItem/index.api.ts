import { gql } from '@apollo/client';
import { getInternalClient } from '@/app/utils/client';
import type {
  DeleteStockRequestMutation,
  DeleteStockRequestMutationVariables,
} from './index.api.generated';
import type { FetchResult } from '@apollo/client';

export const STOCK_REQUEST_LIST_ITEM_FIELDS = gql`
  fragment StockRequestListItemFields on StockRequest {
    id
    internalUser {
      id
      name
    }
    productRegistrations {
      id
      product {
        id
        name
        url
      }
    }
  }
`;

const deleteStockRequestGql = gql`
  mutation DeleteStockRequest($id: Int!) {
    deleteStockRequest(id: $id) {
      deleted
    }
  }
`;

export const deleteStockRequest = async (
  variables: DeleteStockRequestMutationVariables,
): Promise<FetchResult<DeleteStockRequestMutation>> =>
  await getInternalClient().mutate<
    DeleteStockRequestMutation,
    DeleteStockRequestMutationVariables
  >({
    mutation: deleteStockRequestGql,
    variables,
  });
