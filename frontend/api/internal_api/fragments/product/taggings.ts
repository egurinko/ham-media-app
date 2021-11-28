import { gql } from '@apollo/client';
import { PRODUCT_TAG_FIELDS } from '../productTag';

export const PRODUCT_TAGGING_FIELDS = gql`
  ${PRODUCT_TAG_FIELDS}
  fragment ProductTaggingFields on ProductTagging {
    id
    productTag {
      ...ProductTagFields
    }
  }
`;
