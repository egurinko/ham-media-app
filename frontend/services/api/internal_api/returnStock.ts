import { gql } from '@apollo/client';
import { STOCK_FIELDS } from './fragments/product/stock';

export const returnStock = gql`
  ${STOCK_FIELDS}
  mutation InternalReturnStock($id: Int!) {
    returnStock(id: $id) {
      ...StockFields
    }
  }
`;
