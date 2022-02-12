import { gql } from '@apollo/client';
import { PRODUCT_FIELDS } from './fragments/product';

export const getProducts = gql`
  ${PRODUCT_FIELDS}
  query InternalGetProducts($ids: [Int!]) {
    products(ids: $ids) {
      ...ProductFields
    }
  }
`;
