import { gql } from '@apollo/client';

export const rejectStockRequest = gql`
  mutation InternalRejectStockRequest($id: Int!, $message: String!) {
    rejectStockRequest(id: $id, message: $message) {
      deleted
    }
  }
`;
