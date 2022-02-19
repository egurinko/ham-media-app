import { gql } from '@apollo/client';

export const deleteProductTag = gql`
  mutation InternalDeleteProductTag($id: Int!) {
    deleteProductTag(id: $id) {
      deleted
    }
  }
`;
