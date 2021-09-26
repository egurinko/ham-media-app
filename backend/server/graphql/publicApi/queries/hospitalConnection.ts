/// <reference types="../__generated__/public_api_types" />
// ref: https://github.com/prisma-labs/graphql-framework-experiment/issues/952#issuecomment-647865021
// because ts-node-dev does not know nexus generated types, type injection is needed

import { queryField, nonNull, stringArg, booleanArg } from 'nexus';
import { connectionFromArray } from 'graphql-relay';
import { hospitalType } from '../types';

export const hospitalConnection = queryField((t) => {
  t.connectionField('publicHospitalConnection', {
    type: hospitalType,
    additionalArgs: {
      searchText: nonNull(stringArg()),
      reservable: nonNull(booleanArg()),
      nightServiceOption: nonNull(booleanArg()),
      insuranceEnabled: nonNull(booleanArg()),
      jsavaOption: nonNull(booleanArg()),
      nichijuOption: nonNull(booleanArg()),
    },
    resolve: async (_root, args, ctx) => {
      return connectionFromArray(
        await ctx.prisma.hospital.findMany({
          where: {
            deleted: false,
            hospitalReservationStatus: {
              reservable: args.reservable ? '○' : undefined,
            },
          },
        }),
        args
      );
    },
  });
});
