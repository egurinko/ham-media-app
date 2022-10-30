import { gql } from '@apollo/client';
import { MAKER_FIELDS } from './maker';
import { STOCK_FIELDS } from './product/stock';
import { PRODUCT_TAGGING_FIELDS } from './product/taggings';

export const PRODUCT_FIELDS = gql`
  ${MAKER_FIELDS}
  ${STOCK_FIELDS}
  ${PRODUCT_TAGGING_FIELDS}
  fragment ProductFields on Product {
    id
    name
    remark
    url
    productTaggings {
      ...ProductTaggingFields
    }
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
