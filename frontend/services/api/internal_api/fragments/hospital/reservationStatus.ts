import { gql } from '@apollo/client';

export const HOSPITAL_RESERVATION_STATUS_FIELDS = gql`
  fragment HospitalReservationStatusFields on HospitalReservationStatus {
    id
    required
    reservable
    remark
  }
`;
