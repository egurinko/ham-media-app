import { gql } from '@apollo/client';
import { INTERNAL_USER_FIELDS } from './fragments/internalUser';

export const getInternalUsers = gql`
  ${INTERNAL_USER_FIELDS}
  query InternalGetInternalUsers {
    internalUsers {
      ...InternalUserFields
    }
  }
`;
