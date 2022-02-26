import { gql } from '@apollo/client';

export const deleteStockRequest = gql`
  mutation InternalDeleteStockRequest($id: Int!) {
    deleteStockRequest(id: $id) {
      deleted
    }
  }
`;
