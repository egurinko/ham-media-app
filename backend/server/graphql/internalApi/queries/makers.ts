import { queryField } from 'nexus';
import { makerType } from '../types';

export const makers = queryField((t) => {
  t.nonNull.list.nonNull.field('makers', {
    type: makerType,
    resolve(_root, _args, ctx) {
      return ctx.prisma.maker.findMany();
    },
  });
});
