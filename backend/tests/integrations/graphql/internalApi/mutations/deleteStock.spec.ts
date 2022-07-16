import { setup } from '@tests/utils/setupInternalApi';
import gql from 'graphql-tag';
import { client as db } from '@/services/prisma';

const QUERY = gql`
  mutation ($id: Int!) {
    deleteStock(id: $id) {
      deleted
    }
  }
`;

describe('deleteStock', () => {
  const STOCK_ID = 10;

  const variables = {
    id: STOCK_ID,
  };

  beforeEach(async () => {
    const maker = await db.maker.create({ data: { name: 'makerName' } });
    const product = await db.product.create({
      data: {
        name: 'productName',
        remark: 'remark',
        url: 'https://product.example',
        maker_id: maker.id,
      },
    });

    const role = await db.role.create({ data: { name: 'roleName' } });
    const internalUser = await db.internalUser.create({
      data: {
        name: 'internalUserName',
        email: 'email',
        password_digest: 'passwordDigest',
        discord_user_id: '',
        role_id: role.id,
      },
    });

    await db.stock.create({
      data: {
        id: STOCK_ID,
        expired_at: new Date('2030-10-10').toISOString(),
        product_id: product.id,
        internal_user_id: internalUser.id,
      },
    });
  });

  it('returns deleted', async () => {
    const client = await setup();

    const result = await client.mutate(QUERY, {
      variables,
    });

    expect(result.errors).toBeUndefined();

    const deleteStock = result.data['deleteStock'];
    expect(deleteStock.deleted).toBe(true);
  });

  it('delete stock', async () => {
    const beforeCount = await db.stock.count();
    expect(beforeCount).toBe(1);

    const client = await setup();
    await client.mutate(QUERY, { variables });

    const afterCount = await db.productTagging.count();
    expect(afterCount).toBe(0);
  });
});
