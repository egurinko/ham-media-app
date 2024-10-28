import { gql } from '@apollo/client';
import { HOSPITAL_ADDRESS_FIELDS } from './fragments/hospital/address';

export const upsertHospitalAddressGeoLocation = gql`
  ${HOSPITAL_ADDRESS_FIELDS}
  mutation InternalUpsertHospitalAddressGeoLocation(
    $hospitalAddressId: BigInt!
  ) {
    upsertHospitalAddressGeoLocation(hospitalAddressId: $hospitalAddressId) {
      ...HospitalAddressFields
    }
  }
`;
