import { objectType } from 'nexus';
import { HospitalNightUrgentActionOption } from 'nexus-prisma';

export const nightUrgentActionOptionType = objectType({
  name: HospitalNightUrgentActionOption.$name,
  description: HospitalNightUrgentActionOption.$description,
  definition(t) {
    t.field(HospitalNightUrgentActionOption.id);
    t.field(HospitalNightUrgentActionOption.status);
  },
});
