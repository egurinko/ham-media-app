import { objectType } from 'nexus';
import { HospitalAddressGeoLocation } from 'nexus-prisma';

export const geoLocationType = objectType({
  name: HospitalAddressGeoLocation.$name,
  description: HospitalAddressGeoLocation.$description,
  definition(t) {
    t.field(HospitalAddressGeoLocation.id);
    t.field(HospitalAddressGeoLocation.latitude);
    t.field(HospitalAddressGeoLocation.longitude);
  },
});
