import { queryField } from 'nexus';
import { internalUser } from '../types/internalUser';

export const internalUsers = queryField((t) => {
  t.nonNull.list.nonNull.field('internalUsers', {
    type: internalUser,
    resolve(_root, _args, ctx) {
      return ctx.prisma.internalUser.findMany();
    },
  });
});
