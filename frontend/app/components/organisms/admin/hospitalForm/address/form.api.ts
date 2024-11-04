import { gql } from '@apollo/client';
import { getInternalClient } from '@/app/utils/client';
import type {
  UpdateHospitalAddressMutation,
  UpdateHospitalAddressMutationVariables,
} from './form.api.generated';
import type { FetchResult } from '@apollo/client';

const updateHospitalAddressGql = gql`
  mutation UpdateHospitalAddress(
    $hospitalId: BigInt!
    $address: String!
    $phoneNumber: String!
    $prefectureId: BigInt!
  ) {
    updateHospitalAddress(
      hospital_id: $hospitalId
      address: $address
      phone_number: $phoneNumber
      prefecture_id: $prefectureId
    ) {
      address
    }
  }
`;

export const updateHospitalAddress = async (
  variables: UpdateHospitalAddressMutationVariables,
): Promise<FetchResult<UpdateHospitalAddressMutation>> =>
  await getInternalClient().mutate<
    UpdateHospitalAddressMutation,
    UpdateHospitalAddressMutationVariables
  >({
    mutation: updateHospitalAddressGql,
    variables,
  });
