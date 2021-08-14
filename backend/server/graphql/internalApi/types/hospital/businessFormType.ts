import { objectType } from 'nexus';
import { HospitalBusinessForm } from 'nexus-prisma';

export const businessFormType = objectType({
  name: HospitalBusinessForm.$name,
  description: HospitalBusinessForm.$description,
  definition(t) {
    t.field(HospitalBusinessForm.id);
    t.field(HospitalBusinessForm.business_hour);
    t.field(HospitalBusinessForm.closed_day);
    t.field(HospitalBusinessForm.insurance_enabled);
    t.field(HospitalBusinessForm.remark);
  },
});
