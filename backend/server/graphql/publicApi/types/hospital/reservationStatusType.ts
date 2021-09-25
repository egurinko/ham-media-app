import { objectType } from 'nexus';
import { HospitalReservationStatus } from 'nexus-prisma';

export const reservationStatusType = objectType({
  name: HospitalReservationStatus.$name,
  description: HospitalReservationStatus.$description,
  definition(t) {
    t.field(HospitalReservationStatus.id);
    t.field(HospitalReservationStatus.required);
    t.field(HospitalReservationStatus.reservable);
    t.field(HospitalReservationStatus.remark);
  },
});
