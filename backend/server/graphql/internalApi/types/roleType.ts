import { objectType } from 'nexus';
import { Role } from 'nexus-prisma';

export const roleType = objectType({
  name: Role.$name,
  description: Role.$description,
  definition(t) {
    t.field(Role.id);
    t.field(Role.name);
  },
});
