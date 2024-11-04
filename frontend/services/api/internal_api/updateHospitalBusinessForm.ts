import { gql } from '@apollo/client';

export const updateHospitalBusinessForm = gql`
  mutation InternalUpdateHospitalBusinessForm(
    $hospitalId: BigInt!
    $businessHour: String!
    $closedDay: String!
    $insuranceEnabled: String!
    $remark: String!
  ) {
    updateHospitalBusinessForm(
      hospital_id: $hospitalId
      business_hour: $businessHour
      closed_day: $closedDay
      insurance_enabled: $insuranceEnabled
      remark: $remark
    ) {
      business_hour
    }
  }
`;
