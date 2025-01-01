import { stringArg, nonNull, mutationField } from 'nexus';
import { createSessionType } from '../types/createSessionType';
import { sign } from '@/services/authentication';
import bcrypt from 'bcrypt';
import Mercurius from 'mercurius';
import { judgeError } from '@/services/error/judge';

export const createSessionField = mutationField((t) => {
  t.nonNull.field('createSession', {
    type: createSessionType,
    args: {
      email: nonNull(stringArg()),
      password: nonNull(stringArg()),
    },
    resolve: async (_, args, ctx) => {
      let internalUser;
      try {
        internalUser = await ctx.prisma.internalUser.findUniqueOrThrow({
          where: {
            email: args.email,
          },
        });
      } catch (e) {
        const { key, message, statusCode } = judgeError(e);
        throw new Mercurius.ErrorWithProps(message, {
          key,
          message,
          statusCode,
        });
      }

      const match = await bcrypt.compare(
        args.password,
        internalUser.password_digest,
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
