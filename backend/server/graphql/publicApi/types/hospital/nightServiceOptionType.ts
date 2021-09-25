import { objectType } from 'nexus';
import { HospitalNightServiceOption } from 'nexus-prisma';

export const nightServiceOptionType = objectType({
  name: HospitalNightServiceOption.$name,
  description: HospitalNightServiceOption.$description,
  definition(t) {
    t.field(HospitalNightServiceOption.id);
    t.field(HospitalNightServiceOption.status);
    t.field(HospitalNightServiceOption.remark);
  },
});
