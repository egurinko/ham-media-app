import { gql } from '@apollo/client';

export const HOSPITAL_FIELDS = gql`
  fragment HospitalFields on Hospital {
    id
    name
    url
    deleted
    internal_memo
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
    hospitalInternalReputation {
      id
      star
      remark
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
