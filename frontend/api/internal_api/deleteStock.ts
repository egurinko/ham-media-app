import { gql } from '@apollo/client';
import { STOCK_FIELDS } from './fragments/product/stock';

export const deleteStock = gql`
  ${STOCK_FIELDS}
  mutation InternalDeleteStock($id: Int!) {
    deleteStock(id: $id) {
      ...StockFields
    }
  }
`;
