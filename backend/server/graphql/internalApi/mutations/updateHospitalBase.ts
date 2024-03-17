/// <reference types="../__generated__/internal_api_types" />

import { arg, stringArg, booleanArg, nonNull, mutationField } from 'nexus';
import { hospitalType } from '../types/hospitalType';

export const updateHospitalBaseField = mutationField((t) => {
  t.nonNull.field('updateHospitalBase', {
    type: hospitalType,
    args: {
      id: nonNull(arg({ type: 'BigInt' })),
      name: nonNull(stringArg()),
      url: nonNull(stringArg()),
      deleted: nonNull(booleanArg()),
      internal_memo: nonNull(stringArg()),
    },
    resolve: async (_, args, ctx) => {
      return ctx.prisma.hospital.update({
        data: {
          name: args.name,
          url: args.url,
          deleted: args.deleted,
          internal_memo: args.internal_memo,
        },
        where: {
          id: args.id,
        },
      });
    },
  });
});
