import { gql } from '@apollo/client';

export const deleteInternalUser = gql`
  mutation InternalDeleteInternalUser($id: BigInt!) {
    deleteInternalUser(id: $id) {
      deleted
    }
  }
`;
