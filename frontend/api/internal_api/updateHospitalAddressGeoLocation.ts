import { gql } from '@apollo/client';
import { HOSPITAL_ADDRESS_GEO_LOCATION_FIELDS } from './fragments/hospital/address/geoLocation';

export const updateHospitalAddressGeoLocation = gql`
  ${HOSPITAL_ADDRESS_GEO_LOCATION_FIELDS}
  mutation InternalUpdateHospitalAddressGeoLocation(
    $id: Int!
    $address: String!
  ) {
    updateHospitalAddressGeoLocation(id: $id, address: $address) {
      ...HospitalAddressGeoLocationFields
    }
  }
`;
