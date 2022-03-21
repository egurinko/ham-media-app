import { gql } from '@apollo/client';

export const HOSPITAL_NIGHT_SERVICE_OPTION_FIELDS = gql`
  fragment HospitalNightServiceOptionFields on HospitalNightServiceOption {
    id
    status
    remark
  }
`;
