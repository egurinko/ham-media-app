import { gql } from '@apollo/client';
import { ROLE_FIELDS } from './fragments/role';

export const getInternalUsers = gql`
  ${ROLE_FIELDS}
  query InternalGetRoles {
    roles {
      ...RoleFields
    }
  }
`;
