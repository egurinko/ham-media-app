import { gql } from '@apollo/client';
import { ROLE_FIELDS } from './role';

export const INTERNAL_USER_FIELDS = gql`
  ${ROLE_FIELDS}
  fragment InternalUserFields on InternalUser {
    id
    email
    name
    discord_user_id
    role {
      ...RoleFields
    }
  }
`;
