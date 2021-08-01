import { queryField } from 'nexus';
import { internalUserType } from '../types/internalUserType';

export const internalUsers = queryField((t) => {
  t.nonNull.list.nonNull.field('internalUsers', {
    type: internalUserType,
    resolve(_root, _args, ctx) {
      return ctx.prisma.internalUser.findMany();
    },
  });
});
