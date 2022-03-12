import { setup } from '@tests/utils/setupInternalApi';
import gql from 'graphql-tag';
import { client as db } from '@/services/prisma';

const QUERY = gql`
  query {
    productTagGroups {
      id
      name
    }
  }
`;

const PRODUCT_TAG_GROUP_NAME_1 = 'productTagGroupName1';
const PRODUCT_TAG_GROUP_NAME_2 = 'productTagGroupName2';

const init = async () => {
  await db.productTagGroup.createMany({
    data: [
      { name: PRODUCT_TAG_GROUP_NAME_1 },
      { name: PRODUCT_TAG_GROUP_NAME_2 },
    ],
  });
};

describe('productTagGroups', () => {
  beforeEach(async () => {
    await init();
  });
  it('returns productTagGroups', async () => {
    const client = await setup();

    const result = await client.query(QUERY);

    const productTagGroups = result.data['productTagGroups'];
    expect(productTagGroups.length).toEqual(2);

    expect(productTagGroups[0].id).toEqual(1);
    expect(productTagGroups[0].name).toEqual(PRODUCT_TAG_GROUP_NAME_1);
    expect(productTagGroups[1].id).toEqual(2);
    expect(productTagGroups[1].name).toEqual(PRODUCT_TAG_GROUP_NAME_2);
  });
});
