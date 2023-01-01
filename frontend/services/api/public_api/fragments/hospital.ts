import { gql } from '@apollo/client';

export const HOSPITAL_FIELDS = gql`
  fragment PublicApiHospitalFields on Hospital {
    id
    name
    url
    recommended
    hospitalAddress {
      id
      address
      phone_number
      prefecture {
        name
        id
      }
      hospitalAddressGeoLocation {
        latitude
        longitude
      }
    }
    hospitalBusinessForm {
      id
      business_hour
      closed_day
      insurance_enabled
      remark
    }
    hospitalCertificationOption {
      id
      nichiju_registered
      jsava_registered
    }
    hospitalNightServiceOption {
      id
      status
      remark
    }
    hospitalNightUrgentActionOption {
      id
      status
    }
    hospitalReservationStatus {
      id
      required
      reservable
      remark
    }
  }
`;
