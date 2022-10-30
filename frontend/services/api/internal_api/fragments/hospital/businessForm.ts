import { gql } from '@apollo/client';

export const HOSPITAL_BUSINESS_FORM_FIELDS = gql`
  fragment HospitalBusinessFormFields on HospitalBusinessForm {
    id
    business_hour
    closed_day
    insurance_enabled
    remark
  }
`;
