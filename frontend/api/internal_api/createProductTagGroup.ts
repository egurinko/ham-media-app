import { gql } from '@apollo/client';
import { PRODUCT_TAG_GROUP_FIELDS } from './fragments/productTagGroup';

export const createProductTagGroup = gql`
  ${PRODUCT_TAG_GROUP_FIELDS}
  mutation InternalCreateProductTagGroup($name: String!) {
    createProductTagGroup(name: $name) {
      ...ProductTagGroupFields
    }
  }
`;
