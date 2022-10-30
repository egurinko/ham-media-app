import { gql } from '@apollo/client';

export const deleteStock = gql`
  mutation InternalDeleteStock($id: Int!) {
    deleteStock(id: $id) {
      deleted
    }
  }
`;
