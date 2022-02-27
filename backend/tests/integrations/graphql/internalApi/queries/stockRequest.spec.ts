import { setup } from '@tests/utils/setupInternalApi';
import gql from 'graphql-tag';
import { client as db } from '@/services/prisma';

const QUERY = gql`
  query ($id: Int!) {
    stockRequest(id: $id) {
      id
      internalUser {
        name
        email
      }
      productRegistrations {
        product {
          name
        }
      }
    }
  }
`;

const ROLE_NAME = 'roleName';
const INTERNAL_USER_NAME = 'internalUserName';
const INTERNAL_USER_EMAIL = 'internalUserEmail';
const MAKER_NAME = 'makerName';
const PRODUCT_NAME = 'productName';
const PRODUCT_REMARK = 'productRemark';
const PRODUCT_URL = 'https://product.url';
const STOCK_REQUEST_ID = 1;

const init = async () => {
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
      remark: PRODUCT_REMARK,
      url: PRODUCT_URL,
      maker_id: maker.id,
    },
  });
  await db.stockRequest.create({
    data: {
      id: STOCK_REQUEST_ID,
      internal_user_id: internalUser.id,
      productRegistrations: {
        create: { product_id: product.id },
      },
    },
  });
};

describe('stockRequest', () => {
  beforeEach(async () => {
    await init();
  });

  it('returns stockRequest', async () => {
    const client = await setup();

    const result = await client.query(QUERY, {
      variables: { id: STOCK_REQUEST_ID },
    });

    const stockRequest = result.data['stockRequest'];
    expect(stockRequest.id).toEqual(STOCK_REQUEST_ID);
    expect(stockRequest.internalUser.name).toEqual(INTERNAL_USER_NAME);
    expect(stockRequest.internalUser.email).toEqual(INTERNAL_USER_EMAIL);
    expect(stockRequest.productRegistrations.length).toEqual(1);
    expect(stockRequest.productRegistrations[0].product.name).toEqual(
      PRODUCT_NAME
    );
  });
});
