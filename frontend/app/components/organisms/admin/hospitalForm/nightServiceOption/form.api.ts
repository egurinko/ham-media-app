import { gql } from '@apollo/client';
import { getInternalClient } from '@/app/utils/client';
import type {
  UpdateHospitalNightServiceOptionMutation,
  UpdateHospitalNightServiceOptionMutationVariables,
} from './form.api.generated';
import type { FetchResult } from '@apollo/client';
import 'server-only';

const updateHospitalNightServiceOptionGql = gql`
  mutation UpdateHospitalNightServiceOption(
    $hospitalId: BigInt!
    $status: String!
    $remark: String!
  ) {
    updateHospitalNightServiceOption(
      hospital_id: $hospitalId
      status: $status
      remark: $remark
    ) {
      status
      remark
    }
  }
`;

export const updateHospitalNightServiceOption = async (
  variables: UpdateHospitalNightServiceOptionMutationVariables,
): Promise<FetchResult<UpdateHospitalNightServiceOptionMutation>> =>
  await getInternalClient().mutate<
    UpdateHospitalNightServiceOptionMutation,
    UpdateHospitalNightServiceOptionMutationVariables
  >({
    mutation: updateHospitalNightServiceOptionGql,
    variables,
  });
