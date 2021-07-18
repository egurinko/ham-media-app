import { gql } from '@apollo/client';

export const getInternalUsers = gql`
  query GetInternalUsers {
    internalUsers {
      id
      email
      name
    }
  }
`;
