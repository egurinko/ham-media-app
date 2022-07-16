import { client } from '../../../server/services/prisma';

export const seedInternalUser = async () => {
  const admin = await client.role.findUniqueOrThrow({
    where: { name: 'admin' },
  });
  const user = await client.role.findUniqueOrThrow({ where: { name: 'user' } });

  await client.internalUser.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'admin',
      discord_user_id: '',
      password_digest:
        '$2b$08$nOByk5csZtvw62zGlLZLne63t/jDGqGEoofMWyZ8egaNkcdC1HDra', // password
      role_id: admin.id,
    },
  });

  await client.internalUser.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      name: 'user',
      discord_user_id: '',
      password_digest:
        '$2b$08$nOByk5csZtvw62zGlLZLne63t/jDGqGEoofMWyZ8egaNkcdC1HDra', // password
      role_id: user.id,
    },
  });
};
