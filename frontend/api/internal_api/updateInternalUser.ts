import { gql } from '@apollo/client';
import { INTERNAL_USER_FIELDS } from './fragments/internalUser';

export const updateInternalUser = gql`
  ${INTERNAL_USER_FIELDS}
  mutation InternalUpdateInternalUser(
    $id: BigInt!
    $name: String!
    $email: String!
    $password: String!
    $roleId: Int!
  ) {
    updateInternalUser(
      id: $id
      name: $name
      email: $email
      password: $password
      roleId: $roleId
    ) {
      ...InternalUserFields
    }
  }
`;
