import { gql } from '@apollo/client';
import { PRODUCT_TAG_GROUP_FIELDS } from './fragments/productTagGroup';

export const updateProductTagGroup = gql`
  ${PRODUCT_TAG_GROUP_FIELDS}
  mutation InternalUpdateProductTagGroup($id: Int!, $name: String!) {
    updateProductTagGroup(id: $id, name: $name) {
      ...ProductTagGroupFields
    }
  }
`;
