import { gql } from '@apollo/client';
import { getInternalClient } from '@/app/utils/client';
import type {
  UpdateHospitalBusinessFormMutation,
  UpdateHospitalBusinessFormMutationVariables,
} from './form.api.generated';
import type { FetchResult } from '@apollo/client';
import 'server-only';

const updateHospitalBusinessFormGql = gql`
  mutation UpdateHospitalBusinessForm(
    $hospitalId: BigInt!
    $businessHour: String!
    $closedDay: String!
    $insuranceEnabled: String!
    $remark: String!
  ) {
    updateHospitalBusinessForm(
      hospital_id: $hospitalId
      business_hour: $businessHour
      closed_day: $closedDay
      insurance_enabled: $insuranceEnabled
      remark: $remark
    ) {
      business_hour
    }
  }
`;

export const updateHospitalBusinessForm = async (
  variables: UpdateHospitalBusinessFormMutationVariables,
): Promise<FetchResult<UpdateHospitalBusinessFormMutation>> =>
  await getInternalClient().mutate<
    UpdateHospitalBusinessFormMutation,
    UpdateHospitalBusinessFormMutationVariables
  >({
    mutation: updateHospitalBusinessFormGql,
    variables,
  });
