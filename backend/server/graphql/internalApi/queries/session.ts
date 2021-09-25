import { queryField } from 'nexus';
import { sessionType } from '../types/sessionType';
import { sign } from '@/services/authentication';

export const sessionField = queryField((t) => {
  t.nonNull.field('session', {
    type: sessionType,
    resolve: (_root, _args, ctx) => {
      if (!ctx.currentInternalUser) {
        throw new Error('Authentication Error');
      }
      return {
        token: sign({ email: ctx.currentInternalUser.email }),
      };
    },
  });
});
