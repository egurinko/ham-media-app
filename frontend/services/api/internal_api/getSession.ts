import { gql } from '@apollo/client';
import { INTERNAL_USER_FIELDS } from './fragments/internalUser';

export const getSession = gql`
  ${INTERNAL_USER_FIELDS}
  query InternalGetSession {
    session {
      token
      internalUser {
        ...InternalUserFields
      }
    }
  }
`;
