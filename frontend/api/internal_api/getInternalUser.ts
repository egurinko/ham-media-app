import { gql } from '@apollo/client';

export const getInternalUser = gql`
  query InternalGetInternalUser($id: BigInt!) {
    internalUser(id: $id) {
      id
      email
      name
    }
  }
`;
