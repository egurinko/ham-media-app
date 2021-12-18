import { gql } from '@apollo/client';
import { PRODUCT_TAG_FIELDS } from './fragments/productTag';

export const updateProductTag = gql`
  ${PRODUCT_TAG_FIELDS}
  mutation InternalUpdateProductTag($id: Int!, $name: String!) {
    updateProductTag(id: $id, name: $name) {
      ...ProductTagFields
    }
  }
`;
