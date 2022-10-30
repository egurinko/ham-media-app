import { gql } from '@apollo/client';
import { PRODUCT_TAG_GROUP_FIELDS } from './fragments/productTagGroup';

export const getProductTagGroup = gql`
  ${PRODUCT_TAG_GROUP_FIELDS}
  query InternalGetProductTagGroup($id: Int!) {
    productTagGroup(id: $id) {
      ...ProductTagGroupFields
    }
  }
`;
