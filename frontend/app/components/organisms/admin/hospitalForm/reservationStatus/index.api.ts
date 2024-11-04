import { gql } from '@apollo/client';
import { getInternalClient } from '@/app/utils/client';
import type {
  GetEditableHospitalReservationStatusQuery,
  GetEditableHospitalReservationStatusQueryVariables,
} from './index.api.generated';

const getHospitalReservationStatusGql = gql`
  query GetEditableHospitalReservationStatus($id: BigInt!) {
    hospital(id: $id) {
      id
      hospitalReservationStatus {
        required
        reservable
        remark
      }
    }
  }
`;

export const getHospitalReservationStatus = async (
  variables: GetEditableHospitalReservationStatusQueryVariables,
): Promise<GetEditableHospitalReservationStatusQuery['hospital']> => {
  const { data } = await getInternalClient().query<
    GetEditableHospitalReservationStatusQuery,
    GetEditableHospitalReservationStatusQueryVariables
  >({
    query: getHospitalReservationStatusGql,
    variables,
  });

  return data.hospital;
};
