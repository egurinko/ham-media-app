import { gql } from '@apollo/client';
import { STOCK_FIELDS } from './fragments/product/stock';

export const getStocks = gql`
  ${STOCK_FIELDS}
  query InternalGetStocks($productId: Int!) {
    stocks(productId: $productId) {
      ...StockFields
    }
  }
`;
