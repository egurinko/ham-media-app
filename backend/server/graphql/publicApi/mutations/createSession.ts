import { stringArg, nonNull, mutationField } from 'nexus';
import { createSessionType } from '../types/createSessionType';
import { sign } from '@/services/authentication';
import bcrypt from 'bcrypt';

export const createSessionField = mutationField((t) => {
  t.nonNull.field('createSession', {
    type: createSessionType,
    args: {
      email: nonNull(stringArg()),
      password: nonNull(stringArg()),
    },
    resolve: async (_, args, ctx) => {
      const internalUser = await ctx.prisma.internalUser.findUnique({
        where: {
          email: args.email,
        },
      });

      if (internalUser === null) throw new Error('Not Found');

      const match = await bcrypt.compare(
        args.password,
        internalUser.password_digest
      );

      if (!match) {
        throw new Error('Authentication Error');
      }
      return {
        token: sign({ email: internalUser.email }),
      };
    },
  });
});
