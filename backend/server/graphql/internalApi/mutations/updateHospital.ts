/// <reference types="../__generated__/types" />

import {
  arg,
  stringArg,
  booleanArg,
  nonNull,
  mutationField,
  inputObjectType,
} from 'nexus';
import { hospitalType } from '../types/hospitalType';

export const updateHospitalField = mutationField((t) => {
  t.nonNull.field('updateHospital', {
    type: hospitalType,
    args: {
      id: nonNull(arg({ type: 'BigInt' })),
      name: nonNull(stringArg()),
      url: nonNull(stringArg()),
      deleted: nonNull(booleanArg()),
      internal_memo: nonNull(stringArg()),
      hospitalAddressInput: nonNull(arg({ type: hospitalAddressInputType })),
      hospitalBusinessFormInput: nonNull(
        arg({ type: hospitalBusinessFormInputType })
      ),
      hospitalCertificationOptionInput: nonNull(
        arg({ type: hospitalCertificationOptionInputType })
      ),
      hospitalInternalReputationInput: nonNull(
        arg({ type: hospitalInternalReputationInputType })
      ),
      hospitalNightServiceOptionInput: nonNull(
        arg({ type: hospitalNightServiceOptionInputType })
      ),
      hospitalNightUrgentActionOptionInput: nonNull(
        arg({ type: hospitalNightUrgentActionOptionInputType })
      ),
      hospitalReservationStatusInput: nonNull(
        arg({ type: hospitalReservationStatusInputType })
      ),
    },
    resolve: async (_, args, ctx) => {
      return ctx.prisma.hospital.update({
        data: {
          name: args.name,
          url: args.url,
          deleted: args.deleted,
          internal_memo: args.internal_memo,
          hospitalAddress: {
            update: {
              address: args.hospitalAddressInput.address,
              phone_number: args.hospitalAddressInput.phone_number,
              prefecture_id: args.hospitalAddressInput.prefecture_id,
            },
          },
          hospitalBusinessForm: {
            update: {
              business_hour: args.hospitalBusinessFormInput.business_hour,
              closed_day: args.hospitalBusinessFormInput.closed_day,
              insurance_enabled:
                args.hospitalBusinessFormInput.insurance_enabled,
              remark: args.hospitalBusinessFormInput.remark,
            },
          },
          hospitalCertificationOption: {
            update: {
              nichiju_registered:
                args.hospitalCertificationOptionInput.nichiju_registered,
              jsava_registered:
                args.hospitalCertificationOptionInput.jsava_registered,
            },
          },
          hospitalInternalReputation: {
            update: {
              star: args.hospitalInternalReputationInput.star,
              remark: args.hospitalInternalReputationInput.remark,
            },
          },
          hospitalNightServiceOption: {
            update: {
              status: args.hospitalNightServiceOptionInput.status,
              remark: args.hospitalNightServiceOptionInput.remark,
            },
          },
          hospitalNightUrgentActionOption: {
            update: {
              status: args.hospitalNightUrgentActionOptionInput.status,
            },
          },
          hospitalReservationStatus: {
            update: {
              required: args.hospitalReservationStatusInput.required,
              reservable: args.hospitalReservationStatusInput.reservable,
              remark: args.hospitalReservationStatusInput.remark,
            },
          },
        },
        where: {
          id: args.id,
        },
      });
    },
  });
});

const hospitalAddressInputType = inputObjectType({
  name: 'HospitalAddressInputType',
  definition(t) {
    t.nonNull.string('address');
    t.nonNull.string('phone_number');
    t.nonNull.bigInt('prefecture_id');
  },
});

const hospitalBusinessFormInputType = inputObjectType({
  name: 'HospitalBusinessFormInputType',
  definition(t) {
    t.nonNull.string('business_hour');
    t.nonNull.string('closed_day');
    t.nonNull.string('insurance_enabled');
    t.nonNull.string('remark');
  },
});

const hospitalCertificationOptionInputType = inputObjectType({
  name: 'HospitalCertificationOptionInputType',
  definition(t) {
    t.nonNull.string('nichiju_registered');
    t.nonNull.string('jsava_registered');
  },
});

const hospitalInternalReputationInputType = inputObjectType({
  name: 'HospitalInternalReputationInputType',
  definition(t) {
    t.nonNull.int('star');
    t.nonNull.string('remark');
  },
});

const hospitalNightServiceOptionInputType = inputObjectType({
  name: 'HospitalNightServiceOptionInputType',
  definition(t) {
    t.nonNull.string('status');
    t.nonNull.string('remark');
  },
});

const hospitalNightUrgentActionOptionInputType = inputObjectType({
  name: 'HospitalNightUrgentActionOptionInputType',
  definition(t) {
    t.nonNull.string('status');
  },
});

const hospitalReservationStatusInputType = inputObjectType({
  name: 'HospitalReservationStatusInputType',
  definition(t) {
    t.nonNull.string('required');
    t.nonNull.string('reservable');
    t.nonNull.string('remark');
  },
});
