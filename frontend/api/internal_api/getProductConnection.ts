import { gql } from '@apollo/client';
import { PRODUCT_FIELDS } from './fragments/product';

export const getProductConnection = gql`
  ${PRODUCT_FIELDS}
  query InternalGetProductConnection(
    $first: Int
    $after: String
    $name: String
    $makerId: Int
    $productTagId: Int
    $allocatedInternalUserId: Int
  ) {
    productConnection(
      first: $first
      after: $after
      name: $name
      makerId: $makerId
      productTagId: $productTagId
      allocatedInternalUserId: $allocatedInternalUserId
    ) {
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
