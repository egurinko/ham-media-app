import { gql } from '@apollo/client';
import { PRODUCT_FIELDS } from './fragments/product';

export const getProductConnection = gql`
  ${PRODUCT_FIELDS}
  query InternalGetProductConnection($first: Int, $after: String) {
    productConnection(first: $first, after: $after) {
      edges {
        node {
          ...ProductFields
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;
