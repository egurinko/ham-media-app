import { gql } from '@apollo/client';

export const ROLE_FIELDS = gql`
  fragment RoleFields on Role {
    id
    name
  }
`;
