import { gql } from '@apollo/client';
import { STOCK_REQUEST_FIELDS } from './fragments/stockRequest';

export const createStockRequest = gql`
  ${STOCK_REQUEST_FIELDS}
  mutation InternalCreateStockRequest(
    $requestProducts: [CreateStockRequestRequestProductsInputType!]!
  ) {
    createStockRequest(requestProducts: $requestProducts) {
      ...StockRequestFields
    }
  }
`;
