import { gql } from '@apollo/client';
import { PRODUCT_TAG_GROUP_FIELDS } from './fragments/productTagGroup';

export const getProductTagGroups = gql`
  ${PRODUCT_TAG_GROUP_FIELDS}
  query InternalGetProductTagGroups {
    productTagGroups {
      ...ProductTagGroupFields
    }
  }
`;
