import { setup } from '@tests/utils/setupInternalApi';
import gql from 'graphql-tag';
import { client as db } from '@/services/prisma';

const QUERY = gql`
  mutation ($name: String!) {
    createProductTagGroup(name: $name) {
      id
      name
    }
  }
`;

describe('createProductTagGroup', () => {
  const PRODUCT_TAG_GROUP_NAME = 'productTagGroupName';

  it('returns productTagGroup', async () => {
    const client = await setup();

    const result = await client.mutate(QUERY, {
      variables: {
        name: PRODUCT_TAG_GROUP_NAME,
      },
    });

    expect(result.errors).toBeUndefined();

    const createProductTagGroup = result.data['createProductTagGroup'];
    expect(createProductTagGroup.id).toBeDefined();
    expect(createProductTagGroup.name).toBe(PRODUCT_TAG_GROUP_NAME);
  });

  it('create productTagGroup', async () => {
    const beforeCount = await db.productTagGroup.count();
    expect(beforeCount).toBe(0);

    const client = await setup();

    await client.mutate(QUERY, {
      variables: {
        name: PRODUCT_TAG_GROUP_NAME,
      },
    });

    const afterCount = await db.productTagGroup.count();
    const productTagGroup = await db.productTagGroup.findFirst();
    expect(afterCount).toBe(1);
    expect(productTagGroup.name).toBe(PRODUCT_TAG_GROUP_NAME);
  });
});
