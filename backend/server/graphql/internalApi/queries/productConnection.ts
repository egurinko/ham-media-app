/// <reference types="../__generated__/internal_api_types" />
// ref: https://github.com/prisma-labs/graphql-framework-experiment/issues/952#issuecomment-647865021
// because ts-node-dev does not know nexus generated types, type injection is needed

import { intArg, queryField, stringArg, booleanArg } from 'nexus';
import { connectionFromArray } from 'graphql-relay';
import { productType } from '../types';

// 在庫あり && 割り当てユーザ
// 在庫なし
// どちらも（割り当てユーザのみ）

export const productConnection = queryField((t) => {
  t.connectionField('productConnection', {
    type: productType,
    additionalArgs: {
      name: stringArg(),
      makerId: intArg(),
      productTagId: intArg(),
      allocatedInternalUserId: intArg(),
      hasStock: booleanArg(),
    },
    resolve: async (_root, args, ctx) => {
      // const products = await ctx.prisma.product.findMany({
      //   where: {
      //     name: {
      //       startsWith: args.name ? args.name : undefined,
      //     },
      //     maker_id: args.makerId ? args.makerId : undefined,
      //     productTaggings: args.productTagId
      //       ? {
      //           some: {
      //             product_tag_id: args.productTagId,
      //           },
      //         }
      //       : undefined,
      //     stocks: args.allocatedInternalUserId
      //       ? {
      //           some: {
      //             stockAllocation: {
      //               internal_user_id: args.allocatedInternalUserId,
      //             },
      //           },
      //         }
      //       : undefined,
      //   },
      // });

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
          stocks:
            args.hasStock === undefined
              ? args.allocatedInternalUserId
                ? {
                    some: {
                      stockAllocation: {
                        internal_user_id: args.allocatedInternalUserId,
                      },
                    },
                  }
                : undefined
              : args.hasStock
              ? args.allocatedInternalUserId
                ? {
                    some: {
                      stockAllocation: {
                        internal_user_id: args.allocatedInternalUserId,
                      },
                    },
                  }
                : { some: {} }
              : { none: {} },
        },
      });
      return connectionFromArray(products, args);
    },
  });
});
