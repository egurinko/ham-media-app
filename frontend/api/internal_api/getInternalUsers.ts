import { gql } from '@apollo/client';

export const getInternalUsers = gql`
  query InternalGetInternalUsers {
    internalUsers {
      id
      email
      name
    }
  }
`;
