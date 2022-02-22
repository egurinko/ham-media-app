import { gql } from '@apollo/client';
import { INTERNAL_USER_FIELDS } from './internalUser';
import { PRODUCT_FIELDS } from './product';

export const STOCK_REQUEST_FIELDS = gql`
  ${INTERNAL_USER_FIELDS}
  ${PRODUCT_FIELDS}
  fragment StockRequestFields on StockRequest {
    id
    internalUser {
      ...InternalUserFields
    }
    stockRegistrations {
      id
      stock {
        id
        expired_at
        product {
          id
          name
          url
          maker {
            id
            name
          }
        }
      }
    }
    productRegistrations {
      id
      product {
        ...ProductFields
      }
    }
  }
`;
