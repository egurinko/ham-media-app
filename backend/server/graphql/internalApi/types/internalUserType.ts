import { objectType } from 'nexus';
import { InternalUser } from 'nexus-prisma';

export const internalUserType = objectType({
  name: InternalUser.$name,
  description: InternalUser.$description,
  definition(t) {
    t.field(InternalUser.id);
    t.field(InternalUser.name);
    t.field(InternalUser.email);
    t.field(InternalUser.discord_user_id);
    t.nonNull.field(InternalUser.role);
  },
});
