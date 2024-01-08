import { gql } from '@apollo/client';
import { CART_FIELDS } from './cart';
import { ROLE_FIELDS } from './role';

export const INTERNAL_USER_FIELDS = gql`
  ${ROLE_FIELDS}
  ${CART_FIELDS}
  fragment InternalUserFields on InternalUser {
    id
    email
    name
    discord_user_id
    role {
      ...RoleFields
    }
    cart {
      ...CartFields
    }
  }
`;
