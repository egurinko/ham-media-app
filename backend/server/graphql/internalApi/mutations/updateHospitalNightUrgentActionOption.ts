/// <reference types="../__generated__/internal_api_types" />

import { arg, stringArg, nonNull, mutationField } from 'nexus';
import { nightUrgentActionOptionType } from '../types/hospital/nightUrgentActionOptionType';

export const updateHospitalNightUrgentActionOptionField = mutationField((t) => {
  t.nonNull.field('updateHospitalNightUrgentActionOption', {
    type: nightUrgentActionOptionType,
    args: {
      hospital_id: nonNull(arg({ type: 'BigInt' })),
      status: nonNull(stringArg()),
    },
    resolve: async (_, args, ctx) => {
      return ctx.prisma.hospitalNightUrgentActionOption.update({
        data: {
          status: args.status,
        },
        where: {
          hospital_id: args.hospital_id,
        },
      });
    },
  });
});
