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
    $internalUserId: Int
    $allocatedInternalUserId: Int
    $hasStock: Boolean
  ) {
    productConnection(
      first: $first
      after: $after
      name: $name
      makerId: $makerId
      productTagId: $productTagId
      internalUserId: $internalUserId
      allocatedInternalUserId: $allocatedInternalUserId
      hasStock: $hasStock
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
