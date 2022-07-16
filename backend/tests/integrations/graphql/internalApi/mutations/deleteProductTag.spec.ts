import { setup } from '@tests/utils/setupInternalApi';
import gql from 'graphql-tag';
import { client as db } from '@/services/prisma';

const QUERY = gql`
  mutation ($id: Int!) {
    deleteProductTag(id: $id) {
      deleted
    }
  }
`;

describe('deleteProductTag', () => {
  const PRODUCT_TAG_ID = 10;

  const variables = {
    id: PRODUCT_TAG_ID,
  };

  beforeEach(async () => {
    const productTagGroup = await db.productTagGroup.create({
      data: { name: 'productTagGroupName' },
    });
    await db.productTag.create({
      data: {
        id: PRODUCT_TAG_ID,
        name: 'productTagName',
        product_tag_group_id: productTagGroup.id,
      },
    });
  });

  it('returns deleted', async () => {
    const client = await setup();

    const result = await client.mutate(QUERY, {
      variables,
    });

    expect(result.errors).toBeUndefined();

    const deleteProductTag = result.data['deleteProductTag'];
    expect(deleteProductTag.deleted).toBe(true);
  });

  it('delete productTag', async () => {
    const beforeCount = await db.productTag.count();
    expect(beforeCount).toBe(1);

    const client = await setup();
    await client.mutate(QUERY, { variables });

    const afterCount = await db.productTag.count();
    expect(afterCount).toBe(0);
  });
});
