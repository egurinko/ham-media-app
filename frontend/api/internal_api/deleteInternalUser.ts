import { gql } from '@apollo/client';

export const deleteInternalUser = gql`
  mutation DeleteInternalUser($id: Int!) {
    deleteInternalUser(id: $id) {
      id
      email
      name
    }
  }
`;
