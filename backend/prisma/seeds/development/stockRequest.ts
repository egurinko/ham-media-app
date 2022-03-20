import { client } from '../../../server/services/prisma';

export const seedStockRequest = async () => {
  const user = await client.role.findUnique({ where: { name: 'user' } });

  const sankoProduct = await client.product.findUnique({
    where: { name: 'パーテーションケース ミニ' },
  });
  await client.stockRequest.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      internal_user_id: user.id,
      productRegistrations: {
        create: {
          product_id: sankoProduct.id,
        },
      },
    },
  });
};
