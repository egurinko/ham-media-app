import { gql } from '@apollo/client';
import { ROLE_FIELDS } from './fragments/role';

export const getRoles = gql`
  ${ROLE_FIELDS}
  query InternalGetRoles {
    roles {
      ...RoleFields
    }
  }
`;
