import { getPublicClient } from '@/app/utils/client';
import { createSession as createSessionGql } from '@/services/api/public_api/createSession';
import type {
  PublicCreateSessionMutation,
  PublicCreateSessionMutationVariables,
} from '@/services/api/public_api/types';
import type { FetchResult } from '@apollo/client';
import 'server-only';

export const createSession = async (
  variables: PublicCreateSessionMutationVariables,
): Promise<FetchResult<PublicCreateSessionMutation>> =>
  await getPublicClient().mutate<
    PublicCreateSessionMutation,
    PublicCreateSessionMutationVariables
  >({
    mutation: createSessionGql,
    variables,
  });
