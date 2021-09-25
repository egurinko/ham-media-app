import { objectType } from 'nexus';
import { HospitalAddress } from 'nexus-prisma';

export const addressType = objectType({
  name: HospitalAddress.$name,
  description: HospitalAddress.$description,
  definition(t) {
    t.field(HospitalAddress.id);
    t.field(HospitalAddress.address);
    t.field(HospitalAddress.phone_number);
    t.field(HospitalAddress.prefecture);
    t.field(HospitalAddress.hospitalAddressGeoLocation);
  },
});
