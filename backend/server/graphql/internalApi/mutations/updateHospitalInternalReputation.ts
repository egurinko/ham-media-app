/// <reference types="../__generated__/internal_api_types" />

import { arg, stringArg, nonNull, mutationField, intArg } from 'nexus';
import { internalReputationType } from '../types/hospital/internalReputationType';

export const updateHospitalInternalReputationField = mutationField((t) => {
  t.nonNull.field('updateHospitalInternalReputation', {
    type: internalReputationType,
    args: {
      hospital_id: nonNull(arg({ type: 'BigInt' })),
      star: nonNull(intArg()),
      remark: nonNull(stringArg()),
    },
    resolve: async (_, args, ctx) => {
      return ctx.prisma.hospitalInternalReputation.update({
        data: {
          star: args.star,
          remark: args.remark,
        },
        where: {
          hospital_id: args.hospital_id,
        },
      });
    },
  });
});
