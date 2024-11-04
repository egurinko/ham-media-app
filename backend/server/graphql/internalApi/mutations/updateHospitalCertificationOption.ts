/// <reference types="../__generated__/internal_api_types" />

import { arg, stringArg, nonNull, mutationField } from 'nexus';
import { certificationOptionType } from '../types/hospital/certificationOptionType';

export const updateHospitalCertificationOptionField = mutationField((t) => {
  t.nonNull.field('updateHospitalCertificationOption', {
    type: certificationOptionType,
    args: {
      hospital_id: nonNull(arg({ type: 'BigInt' })),
      nichiju_registered: nonNull(stringArg()),
      jsava_registered: nonNull(stringArg()),
    },
    resolve: async (_, args, ctx) => {
      return ctx.prisma.hospitalCertificationOption.update({
        data: {
          nichiju_registered: args.nichiju_registered,
          jsava_registered: args.jsava_registered,
        },
        where: {
          hospital_id: args.hospital_id,
        },
      });
    },
  });
});
