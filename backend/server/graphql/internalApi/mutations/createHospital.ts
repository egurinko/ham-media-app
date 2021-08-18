/// <reference types="../__generated__/types" />

import { stringArg, booleanArg, nonNull, mutationField } from 'nexus';
import { hospitalType } from '../types/hospitalType';

export const createHospitalField = mutationField((t) => {
  t.nonNull.field('createHospital', {
    type: hospitalType,
    args: {
      name: nonNull(stringArg()),
      url: nonNull(stringArg()),
      deleted: nonNull(booleanArg()),
      internal_memo: nonNull(stringArg()),
    },
    resolve: async (_, args, ctx) => {
      const date = new Date();
      const datetime = date.toLocaleDateString() + date.toLocaleTimeString();
      return ctx.prisma.hospital.create({
        data: {
          name: args.name,
          url: args.url,
          deleted: args.deleted,
          internal_memo: args.internal_memo,
          hospitalAddress: {
            create: {
              address: datetime,
              phone_number: datetime,
              prefecture_id: 1,
            },
          },
          hospitalBusinessForm: {
            create: {
              business_hour: datetime,
              closed_day: datetime,
              insurance_enabled: '不明',
              remark: '',
            },
          },
          hospitalCertificationOption: {
            create: {
              nichiju_registered: '不明',
              jsava_registered: '不明',
            },
          },
          hospitalInternalReputation: {
            create: {
              star: 3,
              remark: '',
            },
          },
          hospitalNightServiceOption: {
            create: {
              status: '不明',
              remark: '',
            },
          },
          hospitalNightUrgentActionOption: {
            create: {
              status: '不明',
            },
          },
          hospitalReservationStatus: {
            create: {
              required: '不明',
              reservable: '不明',
              remark: '',
            },
          },
        },
      });
    },
  });
});
