import { client } from '../../../server/services/prisma';

export const seedCart = async () => {
  const adminUser = await client.internalUser.findUniqueOrThrow({
    where: { email: 'admin@example.com' },
  });
  await client.cart.upsert({
    where: { internal_user_id: adminUser.id },
    update: {},
    create: {
      internal_user_id: adminUser.id,
      items: {},
    },
  });

  const user = await client.internalUser.findUniqueOrThrow({
    where: { email: 'user@example.com' },
  });
  await client.cart.upsert({
    where: { internal_user_id: user.id },
    update: {},
    create: {
      internal_user_id: user.id,
      items: {},
    },
  });
};
