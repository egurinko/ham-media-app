/// <reference types="../__generated__/internal_api_types" />
// ref: https://github.com/prisma-labs/graphql-framework-experiment/issues/952#issuecomment-647865021
// because ts-node-dev does not know nexus generated types, type injection is needed

import { queryField, stringArg, booleanArg, arg } from 'nexus';
import { connectionFromArray } from 'graphql-relay';
import { hospitalType } from '../types';

export const hospitalConnection = queryField((t) => {
  t.connectionField('hospitalConnection', {
    type: hospitalType,
    additionalArgs: {
      name: stringArg(),
      deleted: booleanArg(),
      prefectureId: arg({ type: 'BigInt' }),
    },
    resolve: async (_root, args, ctx) => {
      return connectionFromArray(
        await ctx.prisma.hospital.findMany({
          where: {
            name: {
              contains: args.name ? args.name : undefined,
            },
            deleted: args.deleted ? args.deleted : false,
            hospitalAddress: {
              prefecture: {
                id: args.prefectureId,
              },
            },
          },
        }),
        args
      );
    },
  });
});
