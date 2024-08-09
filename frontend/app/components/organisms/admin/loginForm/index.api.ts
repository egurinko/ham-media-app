import { gql } from '@apollo/client';
import { getPublicClient } from '@/app/utils/client';
import type {
  CreateSessionMutation,
  CreateSessionMutationVariables,
} from './index.api.generated';
import type { FetchResult } from '@apollo/client';
import 'server-only';

const createSessionGql = gql`
  mutation CreateSession($email: String!, $password: String!) {
    createSession(email: $email, password: $password) {
      token
    }
  }
`;

export const createSession = async (
  variables: CreateSessionMutationVariables,
): Promise<FetchResult<CreateSessionMutation>> =>
  await getPublicClient().mutate<
    CreateSessionMutation,
    CreateSessionMutationVariables
  >({
    mutation: createSessionGql,
    variables,
  });
