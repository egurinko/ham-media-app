/// <reference types="../__generated__/types" />
// ref: https://github.com/prisma-labs/graphql-framework-experiment/issues/952#issuecomment-647865021
// because ts-node-dev does not know nexus generated types, type injection is needed

import { queryField } from 'nexus';
import { connectionFromArray } from 'graphql-relay';
import { hospitalType } from '../types';

export const hospitals = queryField((t) => {
  t.connectionField('hospitalConnection', {
    type: hospitalType,
    resolve: async (_root, args, ctx) => {
      return connectionFromArray(await ctx.prisma.hospital.findMany(), args);
    },
  });
});
