import { gql } from '@apollo/client';
import { INTERNAL_USER_FIELDS } from './fragments/internalUser';

export const updateInternalUser = gql`
  ${INTERNAL_USER_FIELDS}
  mutation InternalUpdateInternalUser(
    $id: BigInt!
    $name: String!
    $email: String!
    $password: String!
    $discord_user_id: String!
    $roleId: Int!
  ) {
    updateInternalUser(
      id: $id
      name: $name
      email: $email
      password: $password
      discord_user_id: $discord_user_id
      roleId: $roleId
    ) {
      ...InternalUserFields
    }
  }
`;
