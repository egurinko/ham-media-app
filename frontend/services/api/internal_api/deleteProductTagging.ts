import { gql } from '@apollo/client';

export const deleteProductTagging = gql`
  mutation InternalDeleteProductTagging($id: Int!) {
    deleteProductTagging(id: $id) {
      deleted
    }
  }
`;
