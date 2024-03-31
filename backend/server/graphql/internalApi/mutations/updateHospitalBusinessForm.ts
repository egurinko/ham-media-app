/// <reference types="../__generated__/internal_api_types" />

import { arg, stringArg, nonNull, mutationField } from 'nexus';
import { businessFormType } from '../types/hospital/businessFormType';

export const updateHospitalBusinessFormField = mutationField((t) => {
  t.nonNull.field('updateHospitalBusinessForm', {
    type: businessFormType,
    args: {
      hospital_id: nonNull(arg({ type: 'BigInt' })),
      business_hour: nonNull(stringArg()),
      closed_day: nonNull(stringArg()),
      insurance_enabled: nonNull(stringArg()),
      remark: nonNull(stringArg()),
    },
    resolve: async (_, args, ctx) => {
      return ctx.prisma.hospitalBusinessForm.update({
        data: {
          business_hour: args.business_hour,
          closed_day: args.closed_day,
          insurance_enabled: args.insurance_enabled,
          remark: args.remark,
        },
        where: {
          hospital_id: args.hospital_id,
        },
      });
    },
  });
});
