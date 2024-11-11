import { gql } from '@apollo/client';
import { getInternalClient } from '@/app/utils/client';
import type {
  GetSessonQuery,
  GetSessonQueryVariables,
} from './index.api.generated';

const getCurrentUserRoleGql = gql`
  query GetSesson {
    session {
      internalUser {
        role {
          name
        }
      }
    }
  }
`;

export const getCurrentUserRole = async (
  variables: GetSessonQueryVariables,
): Promise<GetSessonQuery['session']['internalUser']['role']> => {
  const { data } = await getInternalClient().query<
    GetSessonQuery,
    GetSessonQueryVariables
  >({
    query: getCurrentUserRoleGql,
    variables,
  });
  return data.session.internalUser.role;
};
