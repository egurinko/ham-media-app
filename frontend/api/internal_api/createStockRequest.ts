import { gql } from '@apollo/client';
import { STOCK_REQUEST_FIELDS } from './fragments/stockRequest';

export const createStockRequest = gql`
  ${STOCK_REQUEST_FIELDS}
  mutation InternalCreateStockRequest(
    $internalUserId: Int!
    $requestProducts: [CreateStockRequestrequestProductsInputType!]!
  ) {
    createStockRequest(
      internalUserId: $internalUserId
      requestProducts: $requestProducts
    ) {
      ...StockRequestFields
    }
  }
`;
