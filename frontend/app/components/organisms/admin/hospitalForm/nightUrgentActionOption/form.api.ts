import { gql } from '@apollo/client';
import { getInternalClient } from '@/app/utils/client';
import type {
  UpdateHospitalNightUrgentActionOptionMutation,
  UpdateHospitalNightUrgentActionOptionMutationVariables,
} from './form.api.generated';
import type { FetchResult } from '@apollo/client';
import 'server-only';

const updateHospitalNightUrgentActionOptionGql = gql`
  mutation UpdateHospitalNightUrgentActionOption(
    $hospitalId: BigInt!
    $status: String!
  ) {
    updateHospitalNightUrgentActionOption(
      hospital_id: $hospitalId
      status: $status
    ) {
      status
    }
  }
`;

export const updateHospitalNightUrgentActionOption = async (
  variables: UpdateHospitalNightUrgentActionOptionMutationVariables,
): Promise<FetchResult<UpdateHospitalNightUrgentActionOptionMutation>> =>
  await getInternalClient().mutate<
    UpdateHospitalNightUrgentActionOptionMutation,
    UpdateHospitalNightUrgentActionOptionMutationVariables
  >({
    mutation: updateHospitalNightUrgentActionOptionGql,
    variables,
  });
