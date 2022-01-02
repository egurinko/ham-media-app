import { gql } from '@apollo/client';
import { STOCK_REQUEST_FIELDS } from './fragments/stockRequest';

export const getStockRequestConnection = gql`
  ${STOCK_REQUEST_FIELDS}
  query InternalGetStockRequestConnection(
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
          ...StockRequestFields
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
