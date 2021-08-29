import { gql } from '@apollo/client';

export const INTERNAL_USER_FIELDS = gql`
  fragment InternalUserFields on InternalUser {
    id
    email
    name
  }
`;
