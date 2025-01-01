/// <reference types="../__generated__/internal_api_types" />
// ref: https://github.com/prisma-labs/graphql-framework-experiment/issues/952#issuecomment-647865021
// because ts-node-dev does not know nexus generated types, type injection is needed

import { nonNull, intArg, queryField } from 'nexus';
import { stockRequestType } from '../types';
import Mercurius from 'mercurius';
import { judgeError } from '@/services/error/judge';

export const stockRequest = queryField((t) => {
  t.nonNull.field('stockRequest', {
    type: stockRequestType,
    args: {
      id: nonNull(intArg()),
    },
    resolve: async (_root, args, ctx) => {
      try {
        return await ctx.prisma.stockRequest.findUniqueOrThrow({
          where: { id: args.id },
        });
      } catch (e) {
        const { key, message, statusCode } = judgeError(e);
        throw new Mercurius.ErrorWithProps(message, {
          key,
          message,
          statusCode,
        });
      }
    },
  });
});
