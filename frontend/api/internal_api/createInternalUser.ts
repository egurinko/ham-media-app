import { gql } from '@apollo/client';

export const createInternalUser = gql`
  mutation InternalCreateInternalUser(
    $name: String!
    $email: String!
    $password: String!
  ) {
    createInternalUser(name: $name, email: $email, password: $password) {
      id
      email
      name
    }
  }
`;
