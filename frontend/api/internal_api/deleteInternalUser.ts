import { gql } from '@apollo/client';

export const deleteInternalUser = gql`
  mutation DeleteInternalUser($id: BigInt!) {
    deleteInternalUser(id: $id) {
      id
      email
      name
    }
  }
`;
