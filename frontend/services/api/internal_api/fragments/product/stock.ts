import { gql } from '@apollo/client';
import { INTERNAL_USER_FIELDS } from '../internalUser';

export const STOCK_FIELDS = gql`
  ${INTERNAL_USER_FIELDS}
  fragment StockFields on Stock {
    id
    expired_at
    internalUser {
      ...InternalUserFields
    }
    stockAllocation {
      created_at
      id
      internalUser {
        ...InternalUserFields
      }
    }
  }
`;
