import { setup } from '@tests/utils/setupInternalApi';
import gql from 'graphql-tag';
import { client as db } from '@/services/prisma';

const QUERY = gql`
  mutation ($id: Int!) {
    deleteStockRequest(id: $id) {
      deleted
    }
  }
`;

describe('deleteStockRequest', () => {
  const ROLE_NAME = 'roleName';
  const INTERNAL_USER_NAME = 'internalUserName';
  const INTERNAL_USER_EMAIL = 'http://internal_user.com';
  const MAKER_NAME = 'makerName';
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
  });

  it('returns deleted', async () => {
    const client = await setup();

    const result = await client.query(QUERY, {
      variables: { id: STOCK_REQUEST_ID },
    });

    expect(result.errors).toBeUndefined();

    const deleteStockRequest = result.data['deleteStockRequest'];
    expect(deleteStockRequest.deleted).toEqual(true);
  });

  it('delete stockRequest and stockRequestProductRegistration records', async () => {
    const beforeStockRequestCount = await db.stockRequest.count();
    const beforeStockRequestProductRegistrationsCount =
      await db.stockRequestProductRegistration.count();
    expect(beforeStockRequestCount).toEqual(1);
    expect(beforeStockRequestProductRegistrationsCount).toEqual(1);

    const client = await setup();
    await client.query(QUERY, {
      variables: { id: STOCK_REQUEST_ID },
    });

    const afterStockRequestCount = await db.stockRequest.count();
    const afterStockRequestProductRegistrationsCount =
      await db.stockRequestProductRegistration.count();
    expect(afterStockRequestCount).toEqual(0);
    expect(afterStockRequestProductRegistrationsCount).toEqual(0);
  });
});
