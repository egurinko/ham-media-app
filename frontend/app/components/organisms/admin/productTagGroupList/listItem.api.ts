import { gql } from '@apollo/client';
import 'server-only';

export const PRODUCT_TAG_GROUP_LIST_ITEM_FIELDS = gql`
  fragment ProductTagGroupListItemFields on ProductTagGroup {
    id
    name
    productTags {
      id
      name
    }
  }
`;
