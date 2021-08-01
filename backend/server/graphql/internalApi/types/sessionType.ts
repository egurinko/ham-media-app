import { objectType } from 'nexus';

export const sessionType = objectType({
  name: 'Session',
  definition(t) {
    t.nonNull.string('token');
  },
});
