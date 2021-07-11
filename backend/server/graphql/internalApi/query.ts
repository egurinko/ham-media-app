import { queryType } from 'nexus';
import { InternalUser } from 'nexus-prisma';

export const Query = queryType({
  definition(t) {
    t.nonNull.list.nonNull.field('internalUsers', {
      type: InternalUser.$name,
      resolve(_, __, ctx) {
        return ctx.prisma.internalUser.findMany();
      },
    });
  },
});
