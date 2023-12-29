import { setup } from '@tests/utils/setupInternalApi';
import gql from 'graphql-tag';
import { client as db } from '@/services/prisma';

const QUERY = gql`
  mutation (
    $id: Int!
    $requestProducts: [CreateStockRequestRequestProductsInputType!]!
  ) {
    updateStockRequest(id: $id, requestProducts: $requestProducts) {
      id
      productRegistrations {
        product {
          id
        }
      }
    }
  }
`;

describe('updateStockRequest', () => {
  const ROLE_NAME = 'roleName';
  const INTERNAL_USER_NAME = 'internalUserName';
  const INTERNAL_USER_EMAIL = 'http://internal_user.com';
  const MAKER_NAME = 'makerName';
  const PRODUCT_ID = 1;
  const PRODUCT_NAME = 'productName';
  const PRODUCT_URL = 'http://product.com';
  const PRODUCT_REMARK = 'productRemark';
  const UPDATING_PRODUCT_ID = 2;
  const UPDATING_PRODUCT_NAME = 'updatingProductName';
  const UPDATING_PRODUCT_URL = 'http://updating.product.com';
  const UPDATING_PRODUCT_REMARK = 'updatingProductRemark';
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

    await db.stockRequest.create({
      data: {
        id: STOCK_REQUEST_ID,
        internal_user_id: internalUser.id,
        productRegistrations: { create: { product_id: product.id } },
      },
    });

    const updatingProduct = await db.product.create({
      data: {
        id: UPDATING_PRODUCT_ID,
        name: UPDATING_PRODUCT_NAME,
        url: UPDATING_PRODUCT_URL,
        remark: UPDATING_PRODUCT_REMARK,
        maker_id: maker.id,
      },
    });
    await db.stock.create({
      data: {
        product_id: updatingProduct.id,
        internal_user_id: internalUser.id,
        expired_at: new Date('2030/10/10').toISOString(),
      },
    });
  });

  it('returns stock request', async () => {
    const client = await setup();

    const result = await client.query(QUERY, {
      variables: {
        id: STOCK_REQUEST_ID,
        requestProducts: [
          {
            productId: UPDATING_PRODUCT_ID,
            count: 1,
          },
        ],
      },
    });

    expect(result.errors).toBeUndefined();

    const updateStockRequest = result.data['updateStockRequest'];
    expect(updateStockRequest.id).toBe(STOCK_REQUEST_ID);
    expect(updateStockRequest.productRegistrations[0].product.id).toBe(
      UPDATING_PRODUCT_ID,
    );
  });

  it('update stockRequest record', async () => {
    const beforeStockRequest = await db.stockRequest.findFirstOrThrow({
      include: {
        productRegistrations: {
          include: { product: true },
        },
      },
    });
    expect(beforeStockRequest.id).toBe(STOCK_REQUEST_ID);
    expect(beforeStockRequest.productRegistrations.length).toBe(1);
    expect(beforeStockRequest.productRegistrations[0]?.product_id).toBe(
      PRODUCT_ID,
    );

    const client = await setup();
    await client.query(QUERY, {
      variables: {
        id: STOCK_REQUEST_ID,
        requestProducts: [
          {
            productId: UPDATING_PRODUCT_ID,
            count: 1,
          },
        ],
      },
    });

    const afterStockRequest = await db.stockRequest.findFirstOrThrow({
      include: {
        productRegistrations: {
          include: { product: true },
        },
      },
    });
    expect(afterStockRequest.id).toBe(STOCK_REQUEST_ID);
    expect(afterStockRequest.productRegistrations.length).toBe(1);
    expect(afterStockRequest.productRegistrations[0]?.product_id).toBe(
      UPDATING_PRODUCT_ID,
    );
  });
});
