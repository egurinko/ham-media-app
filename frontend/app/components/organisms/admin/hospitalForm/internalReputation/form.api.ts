import { gql } from '@apollo/client';
import { getInternalClient } from '@/app/utils/client';
import type {
  UpdateHospitalInternalReputationMutation,
  UpdateHospitalInternalReputationMutationVariables,
} from './form.api.generated';
import type { FetchResult } from '@apollo/client';

const updateHospitalInternalReputationGql = gql`
  mutation UpdateHospitalInternalReputation(
    $hospitalId: BigInt!
    $star: Int!
    $remark: String!
  ) {
    updateHospitalInternalReputation(
      hospital_id: $hospitalId
      star: $star
      remark: $remark
    ) {
      star
    }
  }
`;

export const updateHospitalInternalReputation = async (
  variables: UpdateHospitalInternalReputationMutationVariables,
): Promise<FetchResult<UpdateHospitalInternalReputationMutation>> =>
  await getInternalClient().mutate<
    UpdateHospitalInternalReputationMutation,
    UpdateHospitalInternalReputationMutationVariables
  >({
    mutation: updateHospitalInternalReputationGql,
    variables,
  });
