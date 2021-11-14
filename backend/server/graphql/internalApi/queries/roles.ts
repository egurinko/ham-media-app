import { queryField } from 'nexus';
import { roleType } from '../types/roleType';

export const roles = queryField((t) => {
  t.nonNull.list.nonNull.field('roles', {
    type: roleType,
    resolve(_root, _args, ctx) {
      return ctx.prisma.role.findMany();
    },
  });
});
