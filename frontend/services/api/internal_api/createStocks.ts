import { gql } from '@apollo/client';
import { STOCK_FIELDS } from './fragments/product/stock';

export const createStocks = gql`
  ${STOCK_FIELDS}
  mutation InternalCreateStocks(
    $productId: Int!
    $stocks: [CreateStocksStocksInputType!]!
  ) {
    createStocks(productId: $productId, stocks: $stocks) {
      ...StockFields
    }
  }
`;
