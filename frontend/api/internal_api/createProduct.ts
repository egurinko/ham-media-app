import { gql } from '@apollo/client';
import { PRODUCT_FIELDS } from './fragments/product';

export const createProduct = gql`
  ${PRODUCT_FIELDS}
  mutation InternalCreateProduct(
    $makerId: Int!
    $name: String!
    $remark: String!
    $file: Upload!
  ) {
    createProduct(
      makerId: $makerId
      name: $name
      remark: $remark
      file: $file
    ) {
      ...ProductFields
    }
  }
`;
