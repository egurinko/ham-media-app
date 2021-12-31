/// <reference types="../__generated__/internal_api_types" />
// ref: https://github.com/prisma-labs/graphql-framework-experiment/issues/952#issuecomment-647865021
// because ts-node-dev does not know nexus generated types, type injection is needed

import { arg, nonNull, queryField } from 'nexus';
import { connectionFromArray } from 'graphql-relay';
import { stockRequestType } from '../types';

export const stockRequestConnection = queryField((t) => {
  t.connectionField('stockRequestConnection', {
    type: stockRequestType,
    additionalArgs: {
      internalUserId: nonNull(arg({ type: 'BigInt' })),
    },
    resolve: async (_root, args, ctx) => {
      const stockRequests = await ctx.prisma.stockRequest.findMany({
        where: { internal_user_id: args.internalUserId },
      });
      return connectionFromArray(stockRequests, args);
    },
  });
});
