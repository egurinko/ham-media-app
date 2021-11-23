import { gql } from '@apollo/client';
import { MAKER_FIELDS } from './maker';
import { STOCK_FIELDS } from './product/stock';

export const PRODUCT_FIELDS = gql`
  ${MAKER_FIELDS}
  ${STOCK_FIELDS}
  fragment ProductFields on Product {
    id
    name
    remark
    url
    maker {
      ...MakerFields
    }
    stocks {
      ...StockFields
    }
    totalStockAmount
    allocatedStockAmount
    remainingStockAmount
  }
`;
