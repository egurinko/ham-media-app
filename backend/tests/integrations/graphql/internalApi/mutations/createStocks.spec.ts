import { setup } from '@tests/utils/setupInternalApi';
import gql from 'graphql-tag';
import { client as db } from '@/services/prisma';

const QUERY = gql`
  mutation ($productId: Int!, $stocks: [CreateStocksStocksInputType!]!) {
    createStocks(productId: $productId, stocks: $stocks) {
      id
      expired_at
      stockAllocation {
        id
      }
      product {
        id
      }
      internalUser {
        id
      }
    }
  }
`;

describe('createStocks', () => {
  const INTERNAL_USER_ID = 10;
  const PRODUCT_ID = 1;

  const variables = {
    productId: PRODUCT_ID,
    stocks: [
      {
        expiredAt: new Date('2030/10/10').toISOString(),
        amount: 2,
        internalUserId: INTERNAL_USER_ID,
      },
    ],
  };

  beforeEach(async () => {
    const role = await db.role.create({ data: { name: 'roleName' } });
    await db.internalUser.create({
      data: {
        id: INTERNAL_USER_ID,
        name: 'internalUserName',
        email: 'internal@user.example',
        discord_user_id: 'discordUserId',
        password_digest: 'passwordDigest',
        role_id: role.id,
      },
    });

    const maker = await db.maker.create({ data: { name: 'makerName' } });
    await db.product.create({
      data: {
        id: PRODUCT_ID,
        name: 'productName',
        remark: 'remark',
        url: 'https://product.example',
        maker_id: maker.id,
      },
    });
  });

  it('returns stocks', async () => {
    const client = await setup();

    const result = await client.mutate(QUERY, {
      variables,
    });

    expect(result.errors).toBeUndefined();

    const createStocks = result.data['createStocks'];
    expect(createStocks.length).toBe(variables.stocks[0]?.amount);
    createStocks.map((stock) => {
      expect(stock.expired_at).toBe(variables.stocks[0]?.expiredAt);
      expect(stock.product.id).toBe(variables.productId);
      expect(stock.internalUser.id).toBe(variables.stocks[0]?.internalUserId);
    });
  });

  it('create stocks', async () => {
    const beforeCount = await db.stock.count();
    expect(beforeCount).toBe(0);

    const client = await setup();
    await client.mutate(QUERY, { variables });

    const afterCount = await db.stock.count();
    const stocks = await db.stock.findMany({});
    expect(afterCount).toBe(variables.stocks[0]?.amount);
    stocks.map((stock) => {
      expect(stock.expired_at.toISOString()).toBe(
        variables.stocks[0]?.expiredAt
      );
      expect(stock.product_id).toBe(variables.productId);
      expect(Number(stock.internal_user_id)).toBe(
        variables.stocks[0]?.internalUserId
      );
    });
  });
});
