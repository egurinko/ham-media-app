import { setup } from '@tests/utils/setupInternalApi';
import gql from 'graphql-tag';
import { client as db } from '@/services/prisma';

const QUERY = gql`
  query ($ids: [Int!]) {
    products(ids: $ids) {
      id
      name
      remark
      url
    }
  }
`;

const MAKER_NAME = 'makerName';
const PRODUCT_ID_1 = 1;
const PRODUCT_NAME_1 = 'productName1';
const PRODUCT_URL_1 = 'https://example.com1';
const PRODUCT_REMARK_1 = 'productRemark1';
const PRODUCT_ID_2 = 2;
const PRODUCT_NAME_2 = 'productName2';
const PRODUCT_URL_2 = 'https://example.com2';
const PRODUCT_REMARK_2 = 'productRemark2';

const init = async () => {
  const maker = await db.maker.create({
    data: { name: MAKER_NAME },
  });
  await db.product.createMany({
    data: [
      {
        id: PRODUCT_ID_1,
        name: PRODUCT_NAME_1,
        remark: PRODUCT_REMARK_1,
        url: PRODUCT_URL_1,
        maker_id: maker.id,
      },
      {
        id: PRODUCT_ID_2,
        name: PRODUCT_NAME_2,
        remark: PRODUCT_REMARK_2,
        url: PRODUCT_URL_2,
        maker_id: maker.id,
      },
    ],
  });
};

describe('products', () => {
  beforeEach(async () => {
    await init();
  });

  describe('without ids params', () => {
    it('returns all products', async () => {
      const client = await setup();

      const result = await client.query(QUERY);

      const products = result.data['products'];
      expect(products.length).toEqual(2);

      expect(products[0].id).toEqual(PRODUCT_ID_1);
      expect(products[0].name).toEqual(PRODUCT_NAME_1);
      expect(products[0].remark).toEqual(PRODUCT_REMARK_1);
      expect(products[0].url).toEqual(PRODUCT_URL_1);
      expect(products[1].id).toEqual(PRODUCT_ID_2);
      expect(products[1].name).toEqual(PRODUCT_NAME_2);
      expect(products[1].remark).toEqual(PRODUCT_REMARK_2);
      expect(products[1].url).toEqual(PRODUCT_URL_2);
    });
  });

  describe('with ids params', () => {
    it('returns filterd products', async () => {
      const client = await setup();

      const result = await client.query(QUERY, {
        variables: { ids: [PRODUCT_ID_1] },
      });

      const products = result.data['products'];
      expect(products.length).toEqual(1);

      expect(products[0].id).toEqual(PRODUCT_ID_1);
      expect(products[0].name).toEqual(PRODUCT_NAME_1);
      expect(products[0].remark).toEqual(PRODUCT_REMARK_1);
      expect(products[0].url).toEqual(PRODUCT_URL_1);
    });
  });
});
