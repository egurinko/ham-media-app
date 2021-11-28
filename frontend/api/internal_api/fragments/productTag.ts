import { gql } from '@apollo/client';

export const PRODUCT_TAG_FIELDS = gql`
  fragment ProductTagFields on ProductTag {
    id
    name
  }
`;
