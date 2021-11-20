import { gql } from '@apollo/client';
import { PRODUCT_FIELDS } from './fragments/product';

export const getProduct = gql`
  ${PRODUCT_FIELDS}
  query InternalGetProduct($id: Int!) {
    product(id: $id) {
      ...ProductFields
    }
  }
`;
