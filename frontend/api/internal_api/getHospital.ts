import { gql } from '@apollo/client';

export const getHospital = gql`
  query InternalGetHospital($id: BigInt!) {
    hospital(id: $id) {
      id
      name
      url
      deleted
      internal_memo
      hospitalAddress {
        address
        phone_number
        prefecture {
          name
          id
        }
      }
      hospitalBusinessForm {
        business_hour
        closed_day
        insurance_enabled
        remark
      }
      hospitalCertificationOption {
        nichiju_registered
        jsava_registered
      }
      hospitalInternalReputation {
        star
        remark
      }
      hospitalNightServiceOption {
        status
        remark
      }
      hospitalNightUrgentActionOption {
        status
      }
      hospitalReservationStatus {
        required
        reservable
        remark
      }
    }
  }
`;
