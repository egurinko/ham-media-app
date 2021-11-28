import { gql } from '@apollo/client';
import { PRODUCT_TAG_FIELDS } from './fragments/productTag';

export const deleteProductTag = gql`
  ${PRODUCT_TAG_FIELDS}
  mutation InternalDeleteProductTag($id: Int!) {
    deleteProductTag(id: $id) {
      ...ProductTagFields
    }
  }
`;
