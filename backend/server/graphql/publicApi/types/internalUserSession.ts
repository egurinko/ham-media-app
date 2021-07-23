import { objectType } from 'nexus';
import { InternalUserSession } from 'nexus-prisma';

export const internalUserSession = objectType({
  name: InternalUserSession.$name,
  description: InternalUserSession.$description,
  definition(t) {
    t.field(InternalUserSession.id);
    t.field(InternalUserSession.token);
  },
});
