import { gql } from '@apollo/client';

export const updateInternalUser = gql`
  mutation UpdateInternalUser(
    $id: Int!
    $name: String!
    $email: String!
    $password: String!
  ) {
    updateInternalUser(
      id: $id
      name: $name
      email: $email
      password: $password
    ) {
      id
      email
      name
    }
  }
`;
