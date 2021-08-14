import { objectType } from 'nexus';
import { HospitalInternalReputation } from 'nexus-prisma';

export const internalReputationType = objectType({
  name: HospitalInternalReputation.$name,
  description: HospitalInternalReputation.$description,
  definition(t) {
    t.field(HospitalInternalReputation.id);
    t.field(HospitalInternalReputation.star);
    t.field(HospitalInternalReputation.remark);
  },
});
