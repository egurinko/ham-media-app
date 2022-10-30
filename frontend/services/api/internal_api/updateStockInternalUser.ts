import { gql } from '@apollo/client';
import { STOCK_FIELDS } from './fragments/product/stock';

export const updateStockInternalUser = gql`
  ${STOCK_FIELDS}
  mutation InternalUpdateStockInternalUser(
    $id: Int!
    $internalUserId: BigInt!
  ) {
    updateStockInternalUser(id: $id, internalUserId: $internalUserId) {
      ...StockFields
    }
  }
`;
