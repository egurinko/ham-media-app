import { queryField } from 'nexus';
import { InternalUser } from 'nexus-prisma';

export const internalUsers = queryField((t) => {
  t.nonNull.list.nonNull.field('internalUsers', {
    type: InternalUser.$name,
    resolve(_root, _args, ctx) {
      return ctx.prisma.internalUser.findMany();
    },
  });
});
