import { gql } from '@apollo/client';

export const HOSPITAL_INTERNAL_REPUTATION_FIELDS = gql`
  fragment HospitalInternalReputationFields on HospitalInternalReputation {
    id
    star
    remark
  }
`;
