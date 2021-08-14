import { gql } from '@apollo/client';

export const getSession = gql`
  query InternalGetSession {
    session {
      token
    }
  }
`;
