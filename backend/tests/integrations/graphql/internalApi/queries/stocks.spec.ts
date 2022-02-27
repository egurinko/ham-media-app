import { setup } from '@tests/utils/setupInternalApi';
import gql from 'graphql-tag';
import { client as db } from '@/services/prisma';

const QUERY = gql`
  query ($productId: Int!) {
    stocks(productId: $productId) {
      id
      expired_at
      product {
        id
        name
      }
      internalUser {
        name
      }
      stockAllocation {
        internalUser {
          name
        }
      }
    }
  }
`;

const ROLE_NAME = 'roleName';
const STOCK_ADMIN_INTERNAL_USER_NAME = 'internalUserName1';
const STOCK_ADMIN_INTERNAL_USER_EMAIL = 'internalUserEmail1';
const STOCK_ASSIGNED_INTERNAL_USER_NAME = 'internalUserName2';
const STOCK_ASSIGNED_INTERNAL_USER_EMAIL = 'internalUserEmail2';
const MAKER_NAME = 'makerName';
const PRODUCT_ID = 1;
const PRODUCT_NAME = 'productName';
const PRODUCT_REMARK = 'productRemark';
const PRODUCT_URL = 'productUrl';
const STOCK_EXPIRED_AT = new Date('2100-01-01').toISOString();

const init = async () => {
  const role = await db.role.create({ data: { name: ROLE_NAME } });
  const stockAdmin = await db.internalUser.create({
    data: {
      name: STOCK_ADMIN_INTERNAL_USER_NAME,
      email: STOCK_ADMIN_INTERNAL_USER_EMAIL,
      discord_user_id: '',
      password_digest: 'test',
      role_id: role.id,
    },
  });
  const stockAssigned = await db.internalUser.create({
    data: {
      name: STOCK_ASSIGNED_INTERNAL_USER_NAME,
      email: STOCK_ASSIGNED_INTERNAL_USER_EMAIL,
      discord_user_id: '',
      password_digest: 'test',
      role_id: role.id,
    },
  });

  const maker = await db.maker.create({ data: { name: MAKER_NAME } });
  const product = await db.product.create({
    data: {
      id: PRODUCT_ID,
      name: PRODUCT_NAME,
      remark: PRODUCT_REMARK,
      url: PRODUCT_URL,
      maker_id: maker.id,
    },
  });
  await db.stock.create({
    data: {
      internal_user_id: stockAdmin.id,
      product_id: product.id,
      expired_at: STOCK_EXPIRED_AT,
      stockAllocation: {
        create: { internal_user_id: stockAssigned.id },
      },
    },
  });
};

describe('stocks', () => {
  beforeEach(async () => {
    await init();
  });

  it('returns stocks', async () => {
    const client = await setup();

    const result = await client.query(QUERY, {
      variables: { productId: PRODUCT_ID },
    });

    const stocks = result.data['stocks'];
    expect(stocks.length).toEqual(1);
    expect(stocks[0].expired_at).toEqual(STOCK_EXPIRED_AT);
    expect(stocks[0].product.name).toEqual(PRODUCT_NAME);
    expect(stocks[0].internalUser.name).toEqual(STOCK_ADMIN_INTERNAL_USER_NAME);
    expect(stocks[0].stockAllocation.internalUser.name).toEqual(
      STOCK_ASSIGNED_INTERNAL_USER_NAME
    );
  });
});
