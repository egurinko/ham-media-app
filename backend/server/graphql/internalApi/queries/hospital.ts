/// <reference types="../__generated__/types" />
// ref: https://github.com/prisma-labs/graphql-framework-experiment/issues/952#issuecomment-647865021
// because ts-node-dev does not know nexus generated types, type injection is needed

import { queryField, nonNull, arg } from 'nexus';
import { hospitalType } from '../types';

export const hospital = queryField((t) => {
  t.nonNull.field('hospital', {
    type: hospitalType,
    args: {
      id: nonNull(arg({ type: 'BigInt' })),
    },
    resolve: async (_root, args, ctx) => {
      const hospital = await ctx.prisma.hospital.findUnique({
        where: { id: args.id },
      });

      if (!hospital) {
        throw new Error('Not Found');
      }
      return hospital;
    },
  });
});
