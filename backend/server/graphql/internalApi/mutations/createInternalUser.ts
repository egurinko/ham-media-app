import { stringArg, intArg, nonNull, mutationField } from 'nexus';
import Mercurius from 'mercurius';
import { internalUserType } from '../types/internalUserType';
import { hash } from 'bcrypt';
import { judgeError } from '@/services/error/judge';

export const createInternalUserField = mutationField((t) => {
  t.nonNull.field('createInternalUser', {
    type: internalUserType,
    args: {
      name: nonNull(stringArg()),
      email: nonNull(stringArg()),
      password: nonNull(stringArg()),
      roleId: nonNull(intArg()),
    },
    resolve: async (_, args, ctx) => {
      const hashedPassword = await hash(args.password, 8);
      try {
        return await ctx.prisma.internalUser.create({
          data: {
            name: args.name,
            email: args.email,
            password_digest: hashedPassword,
            role_id: args.roleId,
          },
          include: { role: true },
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
