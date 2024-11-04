/// <reference types="../__generated__/internal_api_types" />

import { arg, stringArg, nonNull, mutationField } from 'nexus';
import { nightServiceOptionType } from '../types/hospital/nightServiceOptionType';

export const updateHospitalNightServiceOptionField = mutationField((t) => {
  t.nonNull.field('updateHospitalNightServiceOption', {
    type: nightServiceOptionType,
    args: {
      hospital_id: nonNull(arg({ type: 'BigInt' })),
      status: nonNull(stringArg()),
      remark: nonNull(stringArg()),
    },
    resolve: async (_, args, ctx) => {
      return ctx.prisma.hospitalNightServiceOption.update({
        data: {
          status: args.status,
          remark: args.remark,
        },
        where: {
          hospital_id: args.hospital_id,
        },
      });
    },
  });
});
