import { gql } from '@apollo/client';

export const createProductTags = gql`
  mutation InternalCreateProductTags(
    $productTagGroupId: Int!
    $productTags: [CreateProductTagsProductTagInputType!]!
  ) {
    createProductTags(
      productTagGroupId: $productTagGroupId
      productTags: $productTags
    ) {
      count
    }
  }
`;
