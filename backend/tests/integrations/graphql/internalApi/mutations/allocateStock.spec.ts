import { setup } from '@tests/utils/setupInternalApi';
import gql from 'graphql-tag';
import { client as db } from '@/services/prisma';

const QUERY = gql`
  mutation ($id: Int!, $internalUserId: BigInt!) {
    allocateStock(id: $id, internalUserId: $internalUserId) {
      id
      expired_at
      stockAllocation {
        internalUser {
          id
          name
        }
      }
    }
  }
`;

describe('allocateStock', () => {
  const ROLE_NAME = 'roleName';
  const INTERNAL_USER_ID = 10;
  const INTERNAL_USER_NAME = 'internalUserName';
  const INTERNAL_USER_EMAIL = 'http://internal_user.com';
  const UPDATED_INTERNAL_USER_ID = 20;
  const UPDATED_INTERNAL_USER_NAME = 'updatedInternalUserName';
  const UPDATED_INTERNAL_USER_EMAIL = 'http://updated_internal_user.com';
  const MAKER_NAME = 'makerName';
  const PRODUCT_NAME = 'productName';
  const PRODUCT_URL = 'http://product.com';
  const PRODUCT_REMARK = 'productRemark';
  const STOCK_ID = 1;
  const STOCK_EXPIRED_AT = new Date('2100-01-01').toISOString();

  beforeEach(async () => {
    const role = await db.role.create({ data: { name: ROLE_NAME } });
    const internalUser = await db.internalUser.create({
      data: {
        id: INTERNAL_USER_ID,
        discord_user_id: '',
        name: INTERNAL_USER_NAME,
        email: INTERNAL_USER_EMAIL,
        password_digest: 'test',
        role_id: role.id,
      },
    });
    await db.internalUser.create({
      data: {
        id: UPDATED_INTERNAL_USER_ID,
        discord_user_id: '',
        name: UPDATED_INTERNAL_USER_NAME,
        email: UPDATED_INTERNAL_USER_EMAIL,
        password_digest: 'test',
        role_id: role.id,
      },
    });

    const maker = await db.maker.create({ data: { name: MAKER_NAME } });
    const product = await db.product.create({
      data: {
        name: PRODUCT_NAME,
        url: PRODUCT_URL,
        remark: PRODUCT_REMARK,
        maker_id: maker.id,
      },
    });
    await db.stock.create({
      data: {
        id: STOCK_ID,
        expired_at: STOCK_EXPIRED_AT,
        product_id: product.id,
        internal_user_id: internalUser.id,
      },
    });
  });

  it('returns stock', async () => {
    const client = await setup();

    const result = await client.query(QUERY, {
      variables: { id: STOCK_ID, internalUserId: UPDATED_INTERNAL_USER_ID },
    });

    expect(result.errors).toBeUndefined();

    const allocateStock = result.data['allocateStock'];
    expect(allocateStock.id).toEqual(STOCK_ID);
    expect(allocateStock.expired_at).toEqual(STOCK_EXPIRED_AT);
    expect(allocateStock.stockAllocation.internalUser.id).toEqual(
      UPDATED_INTERNAL_USER_ID
    );
    expect(allocateStock.stockAllocation.internalUser.name).toEqual(
      UPDATED_INTERNAL_USER_NAME
    );
  });

  it('update stockAllocation', async () => {
    const stock = await db.stock.findUnique({
      where: { id: STOCK_ID },
      include: { stockAllocation: { include: { internalUser: true } } },
    });
    expect(stock.stockAllocation).toBeNull();

    const client = await setup();
    await client.query(QUERY, {
      variables: { id: STOCK_ID, internalUserId: UPDATED_INTERNAL_USER_ID },
    });

    const updatedStock = await db.stock.findUnique({
      where: { id: STOCK_ID },
      include: { stockAllocation: { include: { internalUser: true } } },
    });
    expect(updatedStock.stockAllocation?.internalUser.id).toEqual(
      BigInt(UPDATED_INTERNAL_USER_ID)
    );
    expect(updatedStock.stockAllocation?.internalUser.name).toEqual(
      UPDATED_INTERNAL_USER_NAME
    );
  });
});
