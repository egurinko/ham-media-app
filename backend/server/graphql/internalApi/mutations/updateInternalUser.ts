import { arg, stringArg, intArg, nonNull, mutationField } from 'nexus';
import Mercurius from 'mercurius';
import { judgeError } from '@/services/error/judge';
import { internalUserType } from '../types/internalUserType';
import { hash } from 'bcrypt';

export const updateInternalUserField = mutationField((t) => {
  t.nonNull.field('updateInternalUser', {
    type: internalUserType,
    args: {
      id: nonNull(arg({ type: 'BigInt' })),
      name: nonNull(stringArg()),
      email: nonNull(stringArg()),
      password: nonNull(stringArg()),
      roleId: nonNull(intArg()),
    },
    resolve: async (_, args, ctx) => {
      const hashedPassword = await hash(args.password, 8);
      try {
        return await ctx.prisma.internalUser.update({
          data: {
            name: args.name,
            email: args.email,
            password_digest: hashedPassword,
            role_id: args.roleId,
          },
          where: {
            id: args.id,
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
    },
  });
});
