import { gql } from '@apollo/client';
import { getInternalClient } from '@/app/utils/client';
import type {
  UpsertHospitalAddressGeoLocationMutation,
  UpsertHospitalAddressGeoLocationMutationVariables,
} from './addressUpdate.api.generated';
import type { FetchResult } from '@apollo/client';

const upsertHospitalAddressGeoLocationGql = gql`
  mutation UpsertHospitalAddressGeoLocation($hospitalAddressId: BigInt!) {
    upsertHospitalAddressGeoLocation(hospitalAddressId: $hospitalAddressId) {
      id
    }
  }
`;

export const upsertHospitalAddressGeoLocation = async (
  variables: UpsertHospitalAddressGeoLocationMutationVariables,
): Promise<FetchResult<UpsertHospitalAddressGeoLocationMutation>> =>
  await getInternalClient().mutate<
    UpsertHospitalAddressGeoLocationMutation,
    UpsertHospitalAddressGeoLocationMutationVariables
  >({
    mutation: upsertHospitalAddressGeoLocationGql,
    variables,
  });
