import { gql } from '@apollo/client';

export const approveStockRequest = gql`
  mutation InternalApproveStockRequest($id: Int!, $message: String!) {
    approveStockRequest(id: $id, message: $message) {
      deleted
    }
  }
`;
