import { gql } from '@apollo/client';
import { PRODUCT_TAG_FIELDS } from './productTag';

export const PRODUCT_TAG_GROUP_FIELDS = gql`
  ${PRODUCT_TAG_FIELDS}
  fragment ProductTagGroupFields on ProductTagGroup {
    id
    name
    productTags {
      ...ProductTagFields
    }
  }
`;
