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
      discord_user_id: nonNull(stringArg()),
      email: nonNull(stringArg()),
      password: nonNull(stringArg()),
      roleId: nonNull(intArg()),
    },
    resolve: async (_, args, ctx) => {
      const hashedPassword = await hash(args.password, 8);
      try {
        return await ctx.prisma.internalUser.create({
          data: {
            discord_user_id: args.discord_user_id,
            name: args.name,
            email: args.email,
            password_digest: hashedPassword,
            role_id: args.roleId,
            cart: {
              create: {
                items: {},
              },
            },
          },
          include: { role: true, cart: true },
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
