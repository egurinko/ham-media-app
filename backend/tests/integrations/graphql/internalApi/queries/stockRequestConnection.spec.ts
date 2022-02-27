import { setup } from '@tests/utils/setupInternalApi';
import gql from 'graphql-tag';
import { client as db } from '@/services/prisma';

const QUERY = gql`
  query ($first: Int, $after: String, $internalUserId: BigInt) {
    stockRequestConnection(
      first: $first
      after: $after
      internalUserId: $internalUserId
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          internalUser {
            id
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
    }
  }
`;

const ROLE_NAME = 'roleName';
const MAKER_NAME = 'makerName';
const PRODUCT_NAME = 'productName';
const PRODUCT_REMARK = 'productRemark';
const PRODUCT_URL = 'https://product.url';
const INTERNAL_USER_ID_1 = 10;
const INTERNAL_USER_NAME_1 = 'internalUserName1';
const INTERNAL_USER_EMAIL_1 = 'internalUserEmail1';
const STOCK_REQUEST_ID_1 = 1;

const INTERNAL_USER_ID_2 = 20;
const INTERNAL_USER_NAME_2 = 'internalUserName2';
const INTERNAL_USER_EMAIL_2 = 'internalUserEmail2';
const STOCK_REQUEST_ID_2 = 2;

const init = async () => {
  const role = await db.role.create({ data: { name: ROLE_NAME } });
  const maker = await db.maker.create({ data: { name: MAKER_NAME } });
  const product = await db.product.create({
    data: {
      name: PRODUCT_NAME,
      remark: PRODUCT_REMARK,
      url: PRODUCT_URL,
      maker_id: maker.id,
    },
  });

  const internalUser1 = await db.internalUser.create({
    data: {
      discord_user_id: '',
      id: INTERNAL_USER_ID_1,
      name: INTERNAL_USER_NAME_1,
      email: INTERNAL_USER_EMAIL_1,
      password_digest: 'test',
      role_id: role.id,
    },
  });
  const internalUser2 = await db.internalUser.create({
    data: {
      discord_user_id: '',
      id: INTERNAL_USER_ID_2,
      name: INTERNAL_USER_NAME_2,
      email: INTERNAL_USER_EMAIL_2,
      password_digest: 'test',
      role_id: role.id,
    },
  });

  await db.stockRequest.create({
    data: {
      id: STOCK_REQUEST_ID_1,
      internal_user_id: internalUser1.id,
      productRegistrations: {
        create: { product_id: product.id },
      },
    },
  });
  await db.stockRequest.create({
    data: {
      id: STOCK_REQUEST_ID_2,
      internal_user_id: internalUser2.id,
      productRegistrations: {
        create: { product_id: product.id },
      },
    },
  });
};

describe('stockRequestConnection', () => {
  beforeEach(async () => {
    await init();
  });

  describe('with valid params', () => {
    it('returns stockRequestConnection', async () => {
      const client = await setup();

      const result = await client.query(QUERY, {
        variables: { first: 5 },
      });

      const stockRequestConnection = result.data['stockRequestConnection'];
      expect(stockRequestConnection.pageInfo.hasNextPage).toEqual(false);
      expect(stockRequestConnection.pageInfo.endCursor).toBeDefined();

      const edges = stockRequestConnection.edges;
      expect(edges.length).toEqual(2);
      const node1 = edges[0].node;
      expect(node1.id).toEqual(STOCK_REQUEST_ID_1);
      expect(node1.internalUser.id).toEqual(INTERNAL_USER_ID_1);
      expect(node1.internalUser.name).toEqual(INTERNAL_USER_NAME_1);
      expect(node1.internalUser.email).toEqual(INTERNAL_USER_EMAIL_1);
      expect(node1.productRegistrations.length).toEqual(1);
      expect(node1.productRegistrations[0].product.name).toEqual(PRODUCT_NAME);

      const node2 = edges[1].node;
      expect(node2.id).toEqual(STOCK_REQUEST_ID_2);
      expect(node2.internalUser.id).toEqual(INTERNAL_USER_ID_2);
      expect(node2.internalUser.name).toEqual(INTERNAL_USER_NAME_2);
      expect(node2.internalUser.email).toEqual(INTERNAL_USER_EMAIL_2);
      expect(node2.productRegistrations.length).toEqual(1);
      expect(node2.productRegistrations[0].product.name).toEqual(PRODUCT_NAME);
    });

    describe('with internalUserId', () => {
      it('returns filtered stockRequestConnection', async () => {
        const client = await setup();

        const result = await client.query(QUERY, {
          variables: { first: 5, internalUserId: INTERNAL_USER_ID_1 },
        });

        const stockRequestConnection = result.data['stockRequestConnection'];
        const edges = stockRequestConnection.edges;
        expect(edges.length).toEqual(1);
        const node = edges[0].node;
        expect(node.id).toEqual(STOCK_REQUEST_ID_1);
        expect(node.internalUser.id).toEqual(INTERNAL_USER_ID_1);
        expect(node.internalUser.name).toEqual(INTERNAL_USER_NAME_1);
        expect(node.internalUser.email).toEqual(INTERNAL_USER_EMAIL_1);
        expect(node.productRegistrations.length).toEqual(1);
        expect(node.productRegistrations[0].product.name).toEqual(PRODUCT_NAME);
      });
    });
  });
});
