import { gql } from '@apollo/client';

export const STOCK_FIELDS = gql`
  fragment StockFields on Stock {
    id
    expired_at
  }
`;
