import { gql } from '@apollo/client';
import { PRODUCT_TAGGING_FIELDS } from './fragments/product/taggings';

export const deleteProductTagging = gql`
  ${PRODUCT_TAGGING_FIELDS}
  mutation InternalDeleteProductTagging($id: Int!) {
    deleteProductTagging(id: $id) {
      ...ProductTaggingFields
    }
  }
`;
