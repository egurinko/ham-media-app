import { gql } from '@apollo/client';

export const HOSPITAL_NIGHT_URGENT_ACTION_OPTION_FIELDS = gql`
  fragment HospitalNightUrgentActionOptionFields on HospitalNightUrgentActionOption {
    id
    status
  }
`;
