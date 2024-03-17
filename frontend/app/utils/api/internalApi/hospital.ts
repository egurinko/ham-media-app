import { getInternalClient } from '@/app/utils/client';
import { createHospital as createHospitalGql } from '@/services/api/internal_api/createHospital';
import { getHospital as getHospitalGql } from '@/services/api/internal_api/getHospital';
import { getHospitalConnection as getHospitalConnectionGql } from '@/services/api/internal_api/getHospitalConnection';
import type {
  InternalGetHospitalConnectionQuery,
  InternalGetHospitalConnectionQueryVariables,
  InternalGetHospitalQuery,
  InternalGetHospitalQueryVariables,
  InternalCreateHospitalMutation,
  InternalCreateHospitalMutationVariables,
  InternalUpdateHospitalBaseMutation,
  InternalUpdateHospitalBaseMutationVariables,
} from '@/services/api/internal_api/types';
import { updateHospitalBase as updateHospitalGql } from '@/services/api/internal_api/updateHospitalBase';
import type { ApolloQueryResult, FetchResult } from '@apollo/client';
import 'server-only';

export const getHospitalConnection = async (
  variables: InternalGetHospitalConnectionQueryVariables,
): Promise<ApolloQueryResult<InternalGetHospitalConnectionQuery>> =>
  await getInternalClient().query<
    InternalGetHospitalConnectionQuery,
    InternalGetHospitalConnectionQueryVariables
  >({
    query: getHospitalConnectionGql,
    variables,
  });

export const getHospital = async (
  variables: InternalGetHospitalQueryVariables,
): Promise<ApolloQueryResult<InternalGetHospitalQuery>> =>
  await getInternalClient().query<
    InternalGetHospitalQuery,
    InternalGetHospitalQueryVariables
  >({
    query: getHospitalGql,
    variables,
  });

export const createHospital = async (
  variables: InternalCreateHospitalMutationVariables,
): Promise<FetchResult<InternalCreateHospitalMutation>> =>
  await getInternalClient().mutate<
    InternalCreateHospitalMutation,
    InternalCreateHospitalMutationVariables
  >({
    mutation: createHospitalGql,
    variables,
  });

export const updateHospital = async (
  variables: InternalUpdateHospitalBaseMutationVariables,
): Promise<FetchResult<InternalUpdateHospitalBaseMutation>> =>
  await getInternalClient().mutate<
    InternalUpdateHospitalBaseMutation,
    InternalUpdateHospitalBaseMutationVariables
  >({
    mutation: updateHospitalGql,
    variables,
  });
