/// <reference types="../__generated__/internal_api_types" />

import { arg, stringArg, nonNull, mutationField } from 'nexus';
import { reservationStatusType } from '../types/hospital/reservationStatusType';

export const updateHospitalReservationStatusField = mutationField((t) => {
  t.nonNull.field('updateHospitalReservationStatus', {
    type: reservationStatusType,
    args: {
      hospital_id: nonNull(arg({ type: 'BigInt' })),
      required: nonNull(stringArg()),
      reservable: nonNull(stringArg()),
      remark: nonNull(stringArg()),
    },
    resolve: async (_, args, ctx) => {
      return ctx.prisma.hospitalReservationStatus.update({
        data: {
          required: args.required,
          reservable: args.reservable,
          remark: args.remark,
        },
        where: {
          hospital_id: args.hospital_id,
        },
      });
    },
  });
});
