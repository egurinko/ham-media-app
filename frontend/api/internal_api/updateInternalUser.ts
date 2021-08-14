import { gql } from '@apollo/client';

export const updateInternalUser = gql`
  mutation InternalUpdateInternalUser(
    $id: BigInt!
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
