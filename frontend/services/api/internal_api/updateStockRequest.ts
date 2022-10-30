import { gql } from '@apollo/client';
import { STOCK_REQUEST_FIELDS } from './fragments/stockRequest';

export const updateStockRequest = gql`
  ${STOCK_REQUEST_FIELDS}
  mutation InternalUpdateStockRequest(
    $id: Int!
    $requestProducts: [CreateStockRequestRequestProductsInputType!]!
  ) {
    updateStockRequest(id: $id, requestProducts: $requestProducts) {
      ...StockRequestFields
    }
  }
`;
