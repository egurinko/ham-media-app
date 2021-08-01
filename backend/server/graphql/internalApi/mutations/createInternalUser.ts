import { stringArg, nonNull, mutationField } from 'nexus';
import { internalUserType } from '../types/internalUserType';
import { hash } from 'bcrypt';

export const createInternalUserField = mutationField((t) => {
  t.nonNull.field('createInternalUser', {
    type: internalUserType,
    args: {
      name: nonNull(stringArg()),
      email: nonNull(stringArg()),
      password: nonNull(stringArg()),
    },
    resolve: async (_, args, ctx) => {
      const hashedPassword = await hash(args.password, 8);
      return ctx.prisma.internalUser.create({
        data: {
          name: args.name,
          email: args.email,
          password_digest: hashedPassword,
        },
      });
    },
  });
});
