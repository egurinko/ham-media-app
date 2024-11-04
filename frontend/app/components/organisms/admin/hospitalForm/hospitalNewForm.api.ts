import { gql } from '@apollo/client';
import { getInternalClient } from '@/app/utils/client';
import type {
  CreateHospitalMutation,
  CreateHospitalMutationVariables,
} from './hospitalNewForm.api.generated';
import type { FetchResult } from '@apollo/client';
import 'server-only';

const createHospitalGql = gql`
  mutation CreateHospital(
    $name: String!
    $url: String
    $deleted: Boolean!
    $internal_memo: String!
  ) {
    createHospital(
      name: $name
      url: $url
      deleted: $deleted
      internal_memo: $internal_memo
    ) {
      id
    }
  }
`;

export const createHospital = async (
  variables: CreateHospitalMutationVariables,
): Promise<FetchResult<CreateHospitalMutation>> =>
  await getInternalClient().mutate<
    CreateHospitalMutation,
    CreateHospitalMutationVariables
  >({
    mutation: createHospitalGql,
    variables,
  });
