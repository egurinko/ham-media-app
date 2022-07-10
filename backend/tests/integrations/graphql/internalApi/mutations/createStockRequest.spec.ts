import { setup } from '@tests/utils/setupInternalApi';
import gql from 'graphql-tag';
import { client as db } from '@/services/prisma';

const QUERY = gql`
  mutation ($requestProducts: [CreateStockRequestRequestProductsInputType!]!) {
    createStockRequest(requestProducts: $requestProducts) {
      id
      productRegistrations {
        product {
          id
        }
      }
    }
  }
`;

describe('createStockRequest', () => {
  const ROLE_NAME = 'roleName';
  const INTERNAL_USER_NAME = 'internalUserName';
  const INTERNAL_USER_EMAIL = 'http://internal_user.com';
  const MAKER_NAME = 'makerName';
  const PRODUCT_ID = 1;
  const PRODUCT_NAME = 'productName';
  const PRODUCT_URL = 'http://product.com';
  const PRODUCT_REMARK = 'productRemark';
  const STOCK_REQUEST_ID = 1;

  beforeEach(async () => {
    const role = await db.role.create({ data: { name: ROLE_NAME } });
    const internalUser = await db.internalUser.create({
      data: {
        discord_user_id: '',
        name: INTERNAL_USER_NAME,
        email: INTERNAL_USER_EMAIL,
        password_digest: 'test',
        role_id: role.id,
      },
    });
    const maker = await db.maker.create({ data: { name: MAKER_NAME } });
    const product = await db.product.create({
      data: {
        id: PRODUCT_ID,
        name: PRODUCT_NAME,
        url: PRODUCT_URL,
        remark: PRODUCT_REMARK,
        maker_id: maker.id,
      },
    });
    await db.stock.create({
      data: {
        product_id: product.id,
        internal_user_id: internalUser.id,
        expired_at: new Date('2030/10/10').toISOString(),
      },
    });
  });

  it('returns stock request', async () => {
    const client = await setup();

    const result = await client.query(QUERY, {
      variables: {
        requestProducts: [
          {
            productId: PRODUCT_ID,
            count: 1,
          },
        ],
      },
    });

    expect(result.errors).toBeUndefined();

    const createStockRequest = result.data['createStockRequest'];
    expect(createStockRequest.id).toBe(STOCK_REQUEST_ID);
    expect(createStockRequest.productRegistrations[0].product.id).toBe(
      PRODUCT_ID
    );
  });

  it('create stockRequest record', async () => {
    const beforeStockRequestCount = await db.stockRequest.count();
    expect(beforeStockRequestCount).toBe(0);

    const client = await setup();
    await client.query(QUERY, {
      variables: {
        id: STOCK_REQUEST_ID,
        requestProducts: [
          {
            productId: PRODUCT_ID,
            count: 1,
          },
        ],
      },
    });

    const afterStockRequestCount = await db.stockRequest.count();
    expect(afterStockRequestCount).toBe(1);

    const afterStockRequest = await db.stockRequest.findFirst({
      include: {
        productRegistrations: {
          include: { product: true },
        },
      },
    });
    expect(afterStockRequest.id).toBe(STOCK_REQUEST_ID);
    expect(afterStockRequest.productRegistrations.length).toBe(1);
    expect(afterStockRequest.productRegistrations[0]?.product_id).toBe(
      PRODUCT_ID
    );
  });
});
