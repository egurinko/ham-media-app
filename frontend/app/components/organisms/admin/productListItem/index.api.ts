import { gql } from '@apollo/client';

export const PRODUCT_LIST_ITEM_FIELDS = gql`
  fragment ProductListItemFields on Product {
    id
    name
    url
    remark
    totalStockAmount
    allocatedStockAmount
    remainingStockAmount
    productTaggings {
      id
      productTag {
        id
        name
      }
    }
    maker {
      name
    }
    stocks {
      id
      internalUser {
        name
      }
      stockAllocation {
        internalUser {
          name
        }
      }
    }
  }
`;
