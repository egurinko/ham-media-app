import { gql } from '@apollo/client';
import { PRODUCT_FIELDS } from './fragments/product';

export const updateProduct = gql`
  ${PRODUCT_FIELDS}
  mutation InternalUpdateProduct(
    $id: Int!
    $makerId: Int!
    $name: String!
    $remark: String!
    $file: Upload
  ) {
    updateProduct(
      id: $id
      makerId: $makerId
      name: $name
      remark: $remark
      file: $file
    ) {
      ...ProductFields
    }
  }
`;
