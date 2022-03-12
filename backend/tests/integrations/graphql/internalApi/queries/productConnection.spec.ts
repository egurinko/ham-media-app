import { setup } from '@tests/utils/setupInternalApi';
import gql from 'graphql-tag';
import { client as db } from '@/services/prisma';

const QUERY = gql`
  query (
    $first: Int!
    $name: String
    $makerId: Int
    $productTagId: Int
    $allocatedInternalUserId: Int
    $hasStock: Boolean
  ) {
    productConnection(
      first: $first
      name: $name
      makerId: $makerId
      productTagId: $productTagId
      allocatedInternalUserId: $allocatedInternalUserId
      hasStock: $hasStock
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          name
          remark
          url
        }
      }
    }
  }
`;

const PRODUCT_TAG_GROUP_NAME = 'productTagGroupName';
const PRODUCT_TAG_ID_1 = 1;
const PRODUCT_TAG_NAME_1 = 'productTagName1';
const PRODUCT_TAG_ID_2 = 2;
const PRODUCT_TAG_NAME_2 = 'productTagName2';
const MAKER_ID_1 = 1;
const MAKER_NAME_1 = 'makerName1';
const MAKER_ID_2 = 2;
const MAKER_NAME_2 = 'makerName2';
const PRODUCT_ID_1 = 1;
const PRODUCT_NAME_1 = 'productName1';
const PRODUCT_URL_1 = 'https://example.com1';
const PRODUCT_REMARK_1 = 'productRemark1';
const PRODUCT_ID_2 = 2;
const PRODUCT_NAME_2 = 'productName2';
const PRODUCT_URL_2 = 'https://example.com2';
const PRODUCT_REMARK_2 = 'productRemark2';

const ROLE_NAME = 'roleName';
const INTERNAL_USER_ID = 100;
const INTERNAL_USER_NAME = 'internalUserName';
const INTERNAL_USER_EMAIL = 'https://example.com';
const INTERNAL_USER_PASSWORD = 'internalUserPassword';
const INTERNAL_USER_DISCORD_USER_ID = 'internalUserDiscordUserId';

const init = async () => {
  const productTagGroup = await db.productTagGroup.create({
    data: { name: PRODUCT_TAG_GROUP_NAME },
  });
  const productTag1 = await db.productTag.create({
    data: {
      id: PRODUCT_TAG_ID_1,
      name: PRODUCT_TAG_NAME_1,
      product_tag_group_id: productTagGroup.id,
    },
  });
  const productTag2 = await db.productTag.create({
    data: {
      id: PRODUCT_TAG_ID_2,
      name: PRODUCT_TAG_NAME_2,
      product_tag_group_id: productTagGroup.id,
    },
  });

  const maker1 = await db.maker.create({
    data: { id: MAKER_ID_1, name: MAKER_NAME_1 },
  });
  const product1 = await db.product.create({
    data: {
      id: PRODUCT_ID_1,
      name: PRODUCT_NAME_1,
      remark: PRODUCT_REMARK_1,
      url: PRODUCT_URL_1,
      maker_id: maker1.id,
      productTaggings: {
        create: { product_tag_id: productTag1.id },
      },
    },
  });
  const maker2 = await db.maker.create({
    data: { id: MAKER_ID_2, name: MAKER_NAME_2 },
  });
  await db.product.create({
    data: {
      id: PRODUCT_ID_2,
      name: PRODUCT_NAME_2,
      remark: PRODUCT_REMARK_2,
      url: PRODUCT_URL_2,
      maker_id: maker2.id,
      productTaggings: {
        create: { product_tag_id: productTag2.id },
      },
    },
  });

  const role = await db.role.create({
    data: { name: ROLE_NAME },
  });
  const internalUser = await db.internalUser.create({
    data: {
      id: INTERNAL_USER_ID,
      name: INTERNAL_USER_NAME,
      email: INTERNAL_USER_EMAIL,
      password_digest: INTERNAL_USER_PASSWORD,
      discord_user_id: INTERNAL_USER_DISCORD_USER_ID,
      role_id: role.id,
    },
  });
  await db.stock.create({
    data: {
      product_id: product1.id,
      internal_user_id: internalUser.id,
      expired_at: '2100-03-12T16:46:05.773Z',
      stockAllocation: {
        create: { internal_user_id: internalUser.id },
      },
    },
  });
};

describe('productConnection', () => {
  beforeEach(async () => {
    await init();
  });

  describe('without params', () => {
    it('returns all products', async () => {
      const client = await setup();

      const result = await client.query(QUERY, { variables: { first: 5 } });

      const productConnection = result.data['productConnection'];
      expect(productConnection.pageInfo.hasNextPage).toEqual(false);
      expect(productConnection.pageInfo.endCursor).toBeDefined();

      expect(productConnection.edges.length).toEqual(2);

      const product1 = productConnection.edges[0].node;
      expect(product1.id).toEqual(PRODUCT_ID_1);
      expect(product1.name).toEqual(PRODUCT_NAME_1);
      expect(product1.remark).toEqual(PRODUCT_REMARK_1);
      expect(product1.url).toEqual(PRODUCT_URL_1);

      const product2 = productConnection.edges[1].node;
      expect(product2.id).toEqual(PRODUCT_ID_2);
      expect(product2.name).toEqual(PRODUCT_NAME_2);
      expect(product2.remark).toEqual(PRODUCT_REMARK_2);
      expect(product2.url).toEqual(PRODUCT_URL_2);
    });
  });

  describe('with name params', () => {
    it('returns filtered products', async () => {
      const client = await setup();

      const result = await client.query(QUERY, {
        variables: { first: 5, name: PRODUCT_NAME_1 },
      });

      const productConnection = result.data['productConnection'];
      expect(productConnection.edges.length).toEqual(1);

      const product1 = productConnection.edges[0].node;
      expect(product1.id).toEqual(PRODUCT_ID_1);
      expect(product1.name).toEqual(PRODUCT_NAME_1);
      expect(product1.remark).toEqual(PRODUCT_REMARK_1);
      expect(product1.url).toEqual(PRODUCT_URL_1);
    });
  });

  describe('with makerId params', () => {
    it('returns filtered products', async () => {
      const client = await setup();

      const result = await client.query(QUERY, {
        variables: { first: 5, makerId: MAKER_ID_1 },
      });

      const productConnection = result.data['productConnection'];
      expect(productConnection.edges.length).toEqual(1);

      const product1 = productConnection.edges[0].node;
      expect(product1.id).toEqual(PRODUCT_ID_1);
      expect(product1.name).toEqual(PRODUCT_NAME_1);
      expect(product1.remark).toEqual(PRODUCT_REMARK_1);
      expect(product1.url).toEqual(PRODUCT_URL_1);
    });
  });

  describe('with productTagId params', () => {
    it('returns filtered products', async () => {
      const client = await setup();

      const result = await client.query(QUERY, {
        variables: { first: 5, productTagId: PRODUCT_TAG_ID_1 },
      });

      const productConnection = result.data['productConnection'];
      expect(productConnection.edges.length).toEqual(1);

      const product1 = productConnection.edges[0].node;
      expect(product1.id).toEqual(PRODUCT_ID_1);
      expect(product1.name).toEqual(PRODUCT_NAME_1);
      expect(product1.remark).toEqual(PRODUCT_REMARK_1);
      expect(product1.url).toEqual(PRODUCT_URL_1);
    });
  });

  describe('with allocatedInternalUserId params', () => {
    it('returns filtered products', async () => {
      const client = await setup();

      const result = await client.query(QUERY, {
        variables: { first: 5, allocatedInternalUserId: INTERNAL_USER_ID },
      });

      const productConnection = result.data['productConnection'];
      expect(productConnection.edges.length).toEqual(1);

      const product1 = productConnection.edges[0].node;
      expect(product1.id).toEqual(PRODUCT_ID_1);
      expect(product1.name).toEqual(PRODUCT_NAME_1);
      expect(product1.remark).toEqual(PRODUCT_REMARK_1);
      expect(product1.url).toEqual(PRODUCT_URL_1);
    });
  });

  describe('with hasStock params', () => {
    it('returns filtered products', async () => {
      const client = await setup();

      const result = await client.query(QUERY, {
        variables: { first: 5, hasStock: false },
      });

      const productConnection = result.data['productConnection'];
      expect(productConnection.edges.length).toEqual(1);

      const product2 = productConnection.edges[0].node;
      expect(product2.id).toEqual(PRODUCT_ID_2);
      expect(product2.name).toEqual(PRODUCT_NAME_2);
      expect(product2.remark).toEqual(PRODUCT_REMARK_2);
      expect(product2.url).toEqual(PRODUCT_URL_2);
    });
  });
});
