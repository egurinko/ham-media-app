import { queryField } from 'nexus';
import { hospitalType } from '../types';

export const hospitals = queryField((t) => {
  t.nonNull.list.nonNull.field('hospitals', {
    type: hospitalType,
    resolve(_root, _args, ctx) {
      return ctx.prisma.hospital.findMany({ where: { deleted: false } });
    },
  });
});
