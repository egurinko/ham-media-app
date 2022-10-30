import { gql } from '@apollo/client';
import { HOSPITAL_ADDRESS_GEO_LOCATION_FIELDS } from './address/geoLocation';

export const HOSPITAL_ADDRESS_FIELDS = gql`
  ${HOSPITAL_ADDRESS_GEO_LOCATION_FIELDS}
  fragment HospitalAddressFields on HospitalAddress {
    id
    address
    phone_number
    prefecture {
      name
      id
    }
    hospitalAddressGeoLocation {
      ...HospitalAddressGeoLocationFields
    }
  }
`;
