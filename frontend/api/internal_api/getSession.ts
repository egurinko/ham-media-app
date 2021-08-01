import { gql } from '@apollo/client';

export const getSession = gql`
  query GetSession {
    session {
      token
    }
  }
`;
