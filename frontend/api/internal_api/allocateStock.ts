import { gql } from '@apollo/client';
import { STOCK_FIELDS } from './fragments/product/stock';

export const allocateStock = gql`
  ${STOCK_FIELDS}
  mutation InternalAllocateStock($id: Int!, $internalUserId: BigInt!) {
    allocateStock(id: $id, internalUserId: $internalUserId) {
      ...StockFields
    }
  }
`;
