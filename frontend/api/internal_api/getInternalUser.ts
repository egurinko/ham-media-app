import { gql } from '@apollo/client';

export const getInternalUser = gql`
  query GetInternalUser($id: BigInt!) {
    internalUser(id: $id) {
      id
      email
      name
    }
  }
`;
