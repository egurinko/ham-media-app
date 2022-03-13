import { setup } from '@tests/utils/setupInternalApi';
import gql from 'graphql-tag';
import { client as db } from '@/services/prisma';

const QUERY = gql`
  query ($id: Int!) {
    product(id: $id) {
      id
      name
      remark
      url
      productTaggings {
        productTag {
          id
          name
        }
      }
      maker {
        id
        name
      }
      stocks {
        id
        expired_at
        stockAllocation {
          internalUser {
            name
          }
        }
        internalUser {
          name
        }
      }
      totalStockAmount
      allocatedStockAmount
      remainingStockAmount
    }
  }
`;

const PRODUCT_TAG_GROUP_NAME = 'productTagGroupName';
const PRODUCT_TAG_ID = 1;
const PRODUCT_TAG_NAME = 'productTagName';
const MAKER_ID = 1;
const MAKER_NAME = 'makerName';
const PRODUCT_ID = 1;
const PRODUCT_NAME = 'productName';
const PRODUCT_URL = 'https://example.com';
const PRODUCT_REMARK = 'productRemark';
const STOCK_EXPIRTED_AT = '2100-01-01T10:00:00.000Z';

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
  const productTag = await db.productTag.create({
    data: {
      id: PRODUCT_TAG_ID,
      name: PRODUCT_TAG_NAME,
      product_tag_group_id: productTagGroup.id,
    },
  });

  const maker = await db.maker.create({
    data: { id: MAKER_ID, name: MAKER_NAME },
  });
  const product = await db.product.create({
    data: {
      id: PRODUCT_ID,
      name: PRODUCT_NAME,
      remark: PRODUCT_REMARK,
      url: PRODUCT_URL,
      maker_id: maker.id,
      productTaggings: {
        create: { product_tag_id: productTag.id },
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
      product_id: product.id,
      internal_user_id: internalUser.id,
      expired_at: STOCK_EXPIRTED_AT,
      stockAllocation: {
        create: { internal_user_id: internalUser.id },
      },
    },
  });
};

describe('product', () => {
  beforeEach(async () => {
    await init();
  });

  describe('with valid params', () => {
    it('returns product', async () => {
      const client = await setup();

      const result = await client.query(QUERY, {
        variables: { id: PRODUCT_ID },
      });

      const product = result.data['product'];
      expect(product.id).toEqual(PRODUCT_ID);
      expect(product.name).toEqual(PRODUCT_NAME);
      expect(product.remark).toEqual(PRODUCT_REMARK);
      expect(product.url).toEqual(PRODUCT_URL);

      expect(product.productTaggings.length).toEqual(1);
      expect(product.productTaggings[0].productTag.id).toEqual(PRODUCT_TAG_ID);
      expect(product.productTaggings[0].productTag.name).toEqual(
        PRODUCT_TAG_NAME
      );

      expect(product.maker.id).toEqual(MAKER_ID);
      expect(product.maker.name).toEqual(MAKER_NAME);

      expect(product.stocks.length).toEqual(1);
      expect(product.stocks[0].expired_at).toEqual(STOCK_EXPIRTED_AT);
      expect(product.stocks[0].stockAllocation.internalUser.name).toEqual(
        INTERNAL_USER_NAME
      );
      expect(product.stocks[0].internalUser.name).toEqual(INTERNAL_USER_NAME);

      expect(product.totalStockAmount).toEqual(1);
      expect(product.allocatedStockAmount).toEqual(1);
      expect(product.remainingStockAmount).toEqual(0);
    });
  });

  describe('with invalid params', () => {
    it('returns not found', async () => {
      const client = await setup();

      const result = await client.query(QUERY, {
        variables: { id: 2000 },
      });

      expect(result.errors![0]?.message).toEqual('No Product found');
    });
  });
});
