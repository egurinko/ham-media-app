import { gql } from '@apollo/client';

export const readIsAdmin = gql`
  query LocalReadIsAdmin {
    readIsAdmin {
      isAdmin
    }
  }
`;
