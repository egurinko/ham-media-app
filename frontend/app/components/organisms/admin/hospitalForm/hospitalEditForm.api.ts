import { gql } from '@apollo/client';
import { getInternalClient } from '@/app/utils/client';
import type {
  UpdateHospitalMutation,
  UpdateHospitalMutationVariables,
  GetEditableHospitalQuery,
  GetEditableHospitalQueryVariables,
} from './hospitalEditForm.api.generated';
import type { FetchResult, ApolloQueryResult } from '@apollo/client';
import 'server-only';

const updateHospitalGql = gql`
  mutation UpdateHospital(
    $id: BigInt!
    $name: String!
    $url: String!
    $deleted: Boolean!
    $internalMemo: String!
  ) {
    updateHospitalBase(
      id: $id
      name: $name
      url: $url
      deleted: $deleted
      internal_memo: $internalMemo
    ) {
      id
    }
  }
`;

export const updateHospital = async (
  variables: UpdateHospitalMutationVariables,
): Promise<FetchResult<UpdateHospitalMutation>> =>
  await getInternalClient().mutate<
    UpdateHospitalMutation,
    UpdateHospitalMutationVariables
  >({
    mutation: updateHospitalGql,
    variables,
  });

const getHospitalGql = gql`
  query GetEditableHospital($id: BigInt!) {
    hospital(id: $id) {
      id
      name
      url
      deleted
      internal_memo
    }
  }
`;

export const getHospital = async (
  variables: GetEditableHospitalQueryVariables,
): Promise<ApolloQueryResult<GetEditableHospitalQuery>> =>
  await getInternalClient().query<
    GetEditableHospitalQuery,
    GetEditableHospitalQueryVariables
  >({
    query: getHospitalGql,
    variables,
  });
