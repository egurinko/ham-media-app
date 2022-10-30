import { gql } from '@apollo/client';
import { PRODUCT_FIELDS } from './fragments/product';

export const createProduct = gql`
  ${PRODUCT_FIELDS}
  mutation InternalCreateProduct(
    $makerId: Int!
    $name: String!
    $remark: String!
    $file: Upload!
    $productTagIds: [Int!]!
  ) {
    createProduct(
      makerId: $makerId
      name: $name
      remark: $remark
      file: $file
      productTagIds: $productTagIds
    ) {
      ...ProductFields
    }
  }
`;
