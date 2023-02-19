import { objectType, nonNull } from 'nexus';
import { InternalUser } from 'nexus-prisma';
import { roleType } from './roleType';

export const internalUserType = objectType({
  name: InternalUser.$name,
  description: InternalUser.$description,
  definition(t) {
    t.field(InternalUser.id);
    t.field(InternalUser.name);
    t.field(InternalUser.email);
    t.field(InternalUser.discord_user_id);
    t.field(InternalUser.role.name, {
      type: nonNull(roleType),
      resolve: async (root, _args, ctx) => {
        const role = await ctx.prisma.internalUser
          .findUnique({
            where: { email: root.email },
          })
          .role();

        if (!role) throw Error('no internal user');
        return role;
      },
    });
  },
});
