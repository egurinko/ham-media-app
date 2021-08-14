import { objectType } from 'nexus';
import { HospitalCertificationOption } from 'nexus-prisma';

export const certificationOptionType = objectType({
  name: HospitalCertificationOption.$name,
  description: HospitalCertificationOption.$description,
  definition(t) {
    t.field(HospitalCertificationOption.id);
    t.field(HospitalCertificationOption.nichiju_registered);
    t.field(HospitalCertificationOption.jsava_registered);
  },
});
