import { stringArg, nonNull, mutationField } from 'nexus';
import { internalUser } from '../types/internalUser';
import { hash } from 'bcrypt';

export const createInternalUserField = mutationField((t) => {
  t.nonNull.field('createInternalUser', {
    type: internalUser,
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
