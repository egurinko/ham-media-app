import { gql } from '@apollo/client';
import { INTERNAL_USER_FIELDS } from './fragments/internalUser';

export const getInternalUser = gql`
  ${INTERNAL_USER_FIELDS}
  query InternalGetInternalUser($id: BigInt!) {
    internalUser(id: $id) {
      ...InternalUserFields
    }
  }
`;
