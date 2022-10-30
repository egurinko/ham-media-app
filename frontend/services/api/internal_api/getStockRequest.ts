import { gql } from '@apollo/client';
import { STOCK_REQUEST_FIELDS } from './fragments/stockRequest';

export const getStockRequest = gql`
  ${STOCK_REQUEST_FIELDS}
  query InternalGetStockRequest($id: Int!) {
    stockRequest(id: $id) {
      ...StockRequestFields
    }
  }
`;
