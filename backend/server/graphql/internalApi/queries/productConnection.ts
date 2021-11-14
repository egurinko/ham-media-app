/// <reference types="../__generated__/internal_api_types" />
// ref: https://github.com/prisma-labs/graphql-framework-experiment/issues/952#issuecomment-647865021
// because ts-node-dev does not know nexus generated types, type injection is needed

import { queryField } from 'nexus';
import { connectionFromArray } from 'graphql-relay';
import { productType } from '../types';

export const productConnection = queryField((t) => {
  t.connectionField('productConnection', {
    type: productType,
    resolve: async (_root, args, ctx) => {
      return connectionFromArray(await ctx.prisma.product.findMany(), args);
    },
  });
});
