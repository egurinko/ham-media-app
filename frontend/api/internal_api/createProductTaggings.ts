import { gql } from '@apollo/client';

export const createProductTaggings = gql`
  mutation InternalCreateProductTaggings(
    $productId: Int!
    $productTagIds: [Int!]!
  ) {
    createProductTaggings(
      productId: $productId
      productTagIds: $productTagIds
    ) {
      id
    }
  }
`;
