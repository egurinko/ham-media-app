import { setup } from '@tests/utils/setupInternalApi';
import gql from 'graphql-tag';
import { client as db } from '@/services/prisma';

const QUERY = gql`
  mutation ($productId: Int!, $productTagIds: [Int!]!) {
    createProductTaggings(
      productId: $productId
      productTagIds: $productTagIds
    ) {
      id
      name
    }
  }
`;

describe('createProductTaggings', () => {
  const MAKER_NAME = 'makerName';
  const PRODUCT_ID = 1;
  const PRODUCT_NAME = 'projectName';
  const PRODUCT_URL = 'https://product.example';
  const PRODUCT_REMARK = 'remark';

  const PRODUCT_TAG_GROUP_NAME = 'productTagGroupName';
  const PRODUCT_TAG_ID = 1;
  const PRODUCT_TAG_NAME = 'productTagName';

  beforeEach(async () => {
    const maker = await db.maker.create({ data: { name: MAKER_NAME } });
    await db.product.create({
      data: {
        id: PRODUCT_ID,
        name: PRODUCT_NAME,
        url: PRODUCT_URL,
        remark: PRODUCT_REMARK,
        maker_id: maker.id,
      },
    });

    const productTagGroup = await db.productTagGroup.create({
      data: { name: PRODUCT_TAG_GROUP_NAME },
    });
    await db.productTag.create({
      data: {
        id: PRODUCT_TAG_ID,
        name: PRODUCT_TAG_NAME,
        product_tag_group_id: productTagGroup.id,
      },
    });
  });

  it('returns product', async () => {
    const client = await setup();

    const result = await client.mutate(QUERY, {
      variables: {
        productId: PRODUCT_ID,
        productTagIds: [PRODUCT_TAG_ID],
      },
    });

    expect(result.errors).toBeUndefined();

    const createProductTaggings = result.data['createProductTaggings'];
    expect(createProductTaggings.id).toBe(PRODUCT_ID);
    expect(createProductTaggings.name).toBe(PRODUCT_NAME);
  });

  it('create productTaggings', async () => {
    const beforeProductTaggingsCount = await db.productTagging.count();
    const beforeProduct = await db.product.findUnique({
      where: { id: PRODUCT_ID },
      include: { productTaggings: true },
    });
    expect(beforeProductTaggingsCount).toBe(0);
    expect(beforeProduct.productTaggings.length).toBe(0);

    const client = await setup();

    await client.mutate(QUERY, {
      variables: {
        productId: PRODUCT_ID,
        productTagIds: [PRODUCT_TAG_ID],
      },
    });

    const afterProductTaggingsCount = await db.productTagging.count();
    const afterProduct = await db.product.findUnique({
      where: { id: PRODUCT_ID },
      include: { productTaggings: { include: { productTag: true } } },
    });
    expect(afterProductTaggingsCount).toBe(1);
    expect(afterProduct.productTaggings.length).toBe(1);
    expect(afterProduct.productTaggings[0]?.product_id).toBe(PRODUCT_ID);
    expect(afterProduct.productTaggings[0]?.product_tag_id).toBe(
      PRODUCT_TAG_ID
    );
  });
});
