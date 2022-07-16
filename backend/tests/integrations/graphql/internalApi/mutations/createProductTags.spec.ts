import { setup } from '@tests/utils/setupInternalApi';
import gql from 'graphql-tag';
import { client as db } from '@/services/prisma';

const QUERY = gql`
  mutation (
    $productTagGroupId: Int!
    $productTags: [CreateProductTagsProductTagInputType!]!
  ) {
    createProductTags(
      productTagGroupId: $productTagGroupId
      productTags: $productTags
    ) {
      count
    }
  }
`;

describe('createProductTags', () => {
  const PRODUCT_TAG_GROUP_ID = 1;
  const PRODUCT_TAG_GROUP_NAME = 'productTagGroupName';
  const PRODUCT_TAG_NAME = 'productTagName';

  beforeEach(async () => {
    await db.productTagGroup.create({
      data: { id: PRODUCT_TAG_GROUP_ID, name: PRODUCT_TAG_GROUP_NAME },
    });
  });

  it('returns count', async () => {
    const client = await setup();

    const result = await client.mutate(QUERY, {
      variables: {
        productTagGroupId: PRODUCT_TAG_GROUP_ID,
        productTags: [{ name: PRODUCT_TAG_NAME }],
      },
    });

    expect(result.errors).toBeUndefined();

    const createProductTags = result.data['createProductTags'];
    expect(createProductTags.count).toBe(1);
  });

  it('create productTags', async () => {
    const beforeCount = await db.productTag.count();
    expect(beforeCount).toBe(0);

    const client = await setup();

    await client.mutate(QUERY, {
      variables: {
        productTagGroupId: PRODUCT_TAG_GROUP_ID,
        productTags: [{ name: PRODUCT_TAG_NAME }],
      },
    });

    const afterCount = await db.productTag.count();
    const productTagGroup = await db.productTagGroup.findFirst({
      include: { productTags: true },
    });
    expect(afterCount).toBe(1);
    expect(productTagGroup.id).toBe(PRODUCT_TAG_GROUP_ID);
    expect(productTagGroup.productTags.length).toBe(1);
    expect(productTagGroup.productTags[0]?.name).toBe(PRODUCT_TAG_NAME);
  });
});
