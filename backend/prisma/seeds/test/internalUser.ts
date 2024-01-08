import { client } from '../../../server/services/prisma';

export const seedInternalUser = async () => {
  const admin = await client.role.upsert({
    where: { name: 'admin' },
    create: { name: 'admin' },
    update: {},
  });

  const internalUser = await client.internalUser.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      role_id: admin.id,
      name: 'admin',
      discord_user_id: '',
      password_digest:
        '$2b$08$nOByk5csZtvw62zGlLZLne63t/jDGqGEoofMWyZ8egaNkcdC1HDra', // password
    },
  });

  await client.cart.upsert({
    where: { internal_user_id: internalUser.id },
    update: {},
    create: {
      internal_user_id: internalUser.id,
      items: {},
    },
  });
};
