import { gql } from '@apollo/client';

export const createSession = gql`
  mutation CreateSession($email: String!, $password: String!) {
    createSession(email: $email, password: $password) {
      token
    }
  }
`;
