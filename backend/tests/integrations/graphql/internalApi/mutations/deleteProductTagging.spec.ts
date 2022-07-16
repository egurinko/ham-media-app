import { setup } from '@tests/utils/setupInternalApi';
import gql from 'graphql-tag';
import { client as db } from '@/services/prisma';

const QUERY = gql`
  mutation ($id: Int!) {
    deleteProductTagging(id: $id) {
      deleted
    }
  }
`;

describe('deleteProductTagging', () => {
  const PRODUCT_TAGGING_ID = 10;

  const variables = {
    id: PRODUCT_TAGGING_ID,
  };

  beforeEach(async () => {
    const maker = await db.maker.create({ data: { name: 'makerName' } });
    const product = await db.product.create({
      data: {
        name: 'productName',
        remark: 'remark',
        url: 'https://product.example',
        maker_id: maker.id,
      },
    });

    const productTagGroup = await db.productTagGroup.create({
      data: { name: 'productTagGroupName' },
    });
    const productTag = await db.productTag.create({
      data: {
        name: 'productTagName',
        product_tag_group_id: productTagGroup.id,
      },
    });

    await db.productTagging.create({
      data: {
        id: PRODUCT_TAGGING_ID,
        product_id: product.id,
        product_tag_id: productTag.id,
      },
    });
  });

  it('returns deleted', async () => {
    const client = await setup();

    const result = await client.mutate(QUERY, {
      variables,
    });

    expect(result.errors).toBeUndefined();

    const deleteProductTagging = result.data['deleteProductTagging'];
    expect(deleteProductTagging.deleted).toBe(true);
  });

  it('delete productTagging', async () => {
    const beforeCount = await db.productTagging.count();
    expect(beforeCount).toBe(1);

    const client = await setup();
    await client.mutate(QUERY, { variables });

    const afterCount = await db.productTagging.count();
    expect(afterCount).toBe(0);
  });
});
