import { gql } from '@apollo/client';

export const getSession = gql`
  query InternalGetSession {
    session {
      token
      internalUser {
        id
        name
        email
      }
    }
  }
`;
