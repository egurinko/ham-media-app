import { client } from '../../../server/services/prisma';

export const seedInternalUser = async () => {
  const admin = await client.role.findUnique({
    where: { name: 'admin' },
  });

  await client.internalUser.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      role_id: admin.id,
      name: 'admin',
      password_digest:
        '$2b$08$nOByk5csZtvw62zGlLZLne63t/jDGqGEoofMWyZ8egaNkcdC1HDra', // password
    },
  });
};
