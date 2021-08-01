import { intArg, stringArg, nonNull, mutationField } from 'nexus';
import { internalUserType } from '../types/internalUserType';
import { hash } from 'bcrypt';

export const updateInternalUserField = mutationField((t) => {
  t.nonNull.field('updateInternalUser', {
    type: internalUserType,
    args: {
      id: nonNull(intArg()),
      name: nonNull(stringArg()),
      email: nonNull(stringArg()),
      password: nonNull(stringArg()),
    },
    resolve: async (_, args, ctx) => {
      const hashedPassword = await hash(args.password, 8);
      return ctx.prisma.internalUser.update({
        data: {
          name: args.name,
          email: args.email,
          password_digest: hashedPassword,
        },
        where: {
          id: args.id,
        },
      });
    },
  });
});
