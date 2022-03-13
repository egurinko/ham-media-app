import { setup } from '@tests/utils/setupInternalApi';
import gql from 'graphql-tag';
import { client as db } from '@/services/prisma';

const QUERY = gql`
  query ($id: Int!) {
    productTagGroup(id: $id) {
      id
      name
      productTags {
        id
        name
      }
    }
  }
`;

const PRODUCT_TAG_GROUP_ID = 1;
const PRODUCT_TAG_GROUP_NAME = 'productTagGroupName';
const PRODUCT_TAG_NAME = 'productTagName';

const init = async () => {
  const productTagGroup = await db.productTagGroup.create({
    data: { name: PRODUCT_TAG_GROUP_NAME, id: PRODUCT_TAG_GROUP_ID },
  });
  await db.productTag.create({
    data: { name: PRODUCT_TAG_NAME, product_tag_group_id: productTagGroup.id },
  });
};

describe('productTagGroup', () => {
  beforeEach(async () => {
    await init();
  });

  describe('with valid params', () => {
    it('returns productTagGroup', async () => {
      const client = await setup();

      const result = await client.query(QUERY, {
        variables: { id: PRODUCT_TAG_GROUP_ID },
      });

      const productTagGroup = result.data['productTagGroup'];
      expect(productTagGroup.id).toEqual(PRODUCT_TAG_GROUP_ID);
      expect(productTagGroup.name).toEqual(PRODUCT_TAG_GROUP_NAME);
      expect(productTagGroup.productTags.length).toEqual(1);
      expect(productTagGroup.productTags[0].name).toEqual(PRODUCT_TAG_NAME);
    });
  });

  describe('with invalid params', () => {
    it('returns notfound', async () => {
      const client = await setup();

      const result = await client.query(QUERY, {
        variables: { id: 100 },
      });

      expect(result.errors![0]?.message).toEqual('No ProductTagGroup found');
    });
  });
});
