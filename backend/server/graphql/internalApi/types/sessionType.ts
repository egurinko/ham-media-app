import { objectType } from 'nexus';
import { internalUserType } from './internalUserType';

export const sessionType = objectType({
  name: 'Session',
  definition(t) {
    t.nonNull.string('token');
    t.nonNull.field('internalUser', {
      type: internalUserType,
    });
  },
});
