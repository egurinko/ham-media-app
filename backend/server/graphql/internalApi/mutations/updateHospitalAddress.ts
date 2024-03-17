/// <reference types="../__generated__/internal_api_types" />

import { arg, stringArg, nonNull, mutationField } from 'nexus';
import { addressType } from '../types/hospital/addressType';

export const updateHospitalAddressField = mutationField((t) => {
  t.nonNull.field('updateHospitalAddress', {
    type: addressType,
    args: {
      hospital_id: nonNull(arg({ type: 'BigInt' })),
      address: nonNull(stringArg()),
      phone_number: nonNull(stringArg()),
      prefecture_id: nonNull(arg({ type: 'BigInt' })),
    },
    resolve: async (_, args, ctx) => {
      return ctx.prisma.hospitalAddress.update({
        data: {
          address: args.address,
          phone_number: args.phone_number,
          prefecture_id: args.prefecture_id,
        },
        where: {
          hospital_id: args.hospital_id,
        },
      });
    },
  });
});
