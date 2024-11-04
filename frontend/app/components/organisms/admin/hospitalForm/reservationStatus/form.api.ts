import { gql } from '@apollo/client';
import { getInternalClient } from '@/app/utils/client';
import type {
  UpdateHospitalReservationStatusMutation,
  UpdateHospitalReservationStatusMutationVariables,
} from './form.api.generated';
import type { FetchResult } from '@apollo/client';
import 'server-only';

const updateHospitalReservationStatusGql = gql`
  mutation UpdateHospitalReservationStatus(
    $hospitalId: BigInt!
    $required: String!
    $reservable: String!
    $remark: String!
  ) {
    updateHospitalReservationStatus(
      hospital_id: $hospitalId
      required: $required
      reservable: $reservable
      remark: $remark
    ) {
      required
      reservable
      remark
    }
  }
`;

export const updateHospitalReservationStatus = async (
  variables: UpdateHospitalReservationStatusMutationVariables,
): Promise<FetchResult<UpdateHospitalReservationStatusMutation>> =>
  await getInternalClient().mutate<
    UpdateHospitalReservationStatusMutation,
    UpdateHospitalReservationStatusMutationVariables
  >({
    mutation: updateHospitalReservationStatusGql,
    variables,
  });
