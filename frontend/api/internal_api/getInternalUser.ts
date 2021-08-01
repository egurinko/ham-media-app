import { gql } from '@apollo/client';

export const getInternalUser = gql`
  query GetInternalUser($id: Int!) {
    internalUser(id: $id) {
      id
      email
      name
    }
  }
`;
