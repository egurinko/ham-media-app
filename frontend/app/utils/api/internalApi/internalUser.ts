import { getInternalClient } from '@/app/utils/client';
import { createInternalUser as createInternalUserGql } from '@/services/api/internal_api/createInternalUser';
import { deleteInternalUser as deleteInternalUserGql } from '@/services/api/internal_api/deleteInternalUser';
import { getInternalUser as getInternalUserGql } from '@/services/api/internal_api/getInternalUser';
import { getInternalUsers as getInternalUsersGql } from '@/services/api/internal_api/getInternalUsers';
import type {
  InternalUpdateInternalUserMutation,
  InternalUpdateInternalUserMutationVariables,
  InternalCreateInternalUserMutation,
  InternalCreateInternalUserMutationVariables,
  InternalDeleteInternalUserMutation,
  InternalDeleteInternalUserMutationVariables,
  InternalGetInternalUserQuery,
  InternalGetInternalUserQueryVariables,
  InternalGetInternalUsersQuery,
  InternalGetInternalUsersQueryVariables,
} from '@/services/api/internal_api/types';
import { updateInternalUser as updateInternalUserGql } from '@/services/api/internal_api/updateInternalUser';
import type { FetchResult, ApolloQueryResult } from '@apollo/client';
import 'server-only';

export const getInternalUsers = async (
  variables: InternalGetInternalUsersQueryVariables,
): Promise<ApolloQueryResult<InternalGetInternalUsersQuery>> =>
  await getInternalClient().query<
    InternalGetInternalUsersQuery,
    InternalGetInternalUsersQueryVariables
  >({
    query: getInternalUsersGql,
    variables,
  });

export const getInternalUser = async (
  variables: InternalGetInternalUserQueryVariables,
): Promise<ApolloQueryResult<InternalGetInternalUserQuery>> =>
  await getInternalClient().query<
    InternalGetInternalUserQuery,
    InternalGetInternalUserQueryVariables
  >({
    query: getInternalUserGql,
    variables,
  });

export const createInternalUser = async (
  variables: InternalCreateInternalUserMutationVariables,
): Promise<FetchResult<InternalCreateInternalUserMutation>> =>
  await getInternalClient().mutate<
    InternalCreateInternalUserMutation,
    InternalCreateInternalUserMutationVariables
  >({
    mutation: createInternalUserGql,
    variables,
  });

export const updateInternalUser = async (
  variables: InternalUpdateInternalUserMutationVariables,
): Promise<FetchResult<InternalUpdateInternalUserMutation>> =>
  await getInternalClient().mutate<
    InternalUpdateInternalUserMutation,
    InternalUpdateInternalUserMutationVariables
  >({
    mutation: updateInternalUserGql,
    variables,
  });

export const deleteInternalUser = async (
  variables: InternalDeleteInternalUserMutationVariables,
): Promise<FetchResult<InternalDeleteInternalUserMutation>> =>
  await getInternalClient().mutate<
    InternalDeleteInternalUserMutation,
    InternalDeleteInternalUserMutationVariables
  >({
    mutation: deleteInternalUserGql,
    variables,
  });
