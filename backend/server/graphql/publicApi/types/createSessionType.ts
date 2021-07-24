import { objectType } from 'nexus';

export const createSessionType = objectType({
  name: 'CreateSessionType',
  definition(t) {
    t.nonNull.string('token');
  },
});
