import { queryField } from 'nexus';
import { prefectureType } from '../types';

export const prefectures = queryField((t) => {
  t.nonNull.list.nonNull.field('prefectures', {
    type: prefectureType,
    resolve(_root, _args, ctx) {
      return ctx.prisma.prefecture.findMany();
    },
  });
});
