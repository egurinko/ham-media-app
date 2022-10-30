import { gql } from '@apollo/client';

export const HOSPITAL_ADDRESS_GEO_LOCATION_FIELDS = gql`
  fragment HospitalAddressGeoLocationFields on HospitalAddressGeoLocation {
    id
    latitude
    longitude
  }
`;
