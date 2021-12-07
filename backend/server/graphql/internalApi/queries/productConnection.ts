/// <reference types="../__generated__/internal_api_types" />
// ref: https://github.com/prisma-labs/graphql-framework-experiment/issues/952#issuecomment-647865021
// because ts-node-dev does not know nexus generated types, type injection is needed

import { intArg, queryField, stringArg } from 'nexus';
import { connectionFromArray } from 'graphql-relay';
import { productType } from '../types';

export const productConnection = queryField((t) => {
  t.connectionField('productConnection', {
    type: productType,
    additionalArgs: {
      name: stringArg(),
      makerId: intArg(),
      productTagId: intArg(),
    },
    resolve: async (_root, args, ctx) => {
      const products = await ctx.prisma.product.findMany({
        where: {
          name: {
            startsWith: args.name ? args.name : undefined,
          },
          maker_id: args.makerId ? args.makerId : undefined,
          productTaggings: args.productTagId
            ? {
                some: {
                  product_tag_id: args.productTagId,
                },
              }
            : undefined,
        },
      });
      return connectionFromArray(products, args);
    },
  });
});
