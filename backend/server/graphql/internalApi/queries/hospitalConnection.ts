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
              startsWith: args.name ? args.name : undefined,
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
