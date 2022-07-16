import { setup } from '@tests/utils/setupInternalApi';
import gql from 'graphql-tag';
import { client as db } from '@/services/prisma';

const QUERY = gql`
  mutation ($name: String!) {
    createMaker(name: $name) {
      id
      name
    }
  }
`;

describe('createMaker', () => {
  const MAKER_NAME = 'makerName';

  it('returns createMaker', async () => {
    const client = await setup();

    const result = await client.query(QUERY, {
      variables: {
        name: MAKER_NAME,
      },
    });

    expect(result.errors).toBeUndefined();

    const maker = result.data['createMaker'];
    expect(maker.id).toBeDefined();
    expect(maker.name).toEqual(MAKER_NAME);
  });

  it('create maker', async () => {
    expect(await db.maker.count()).toEqual(0);

    const client = await setup();
    await client.query(QUERY, {
      variables: {
        name: MAKER_NAME,
      },
    });

    expect(await db.maker.count()).toEqual(1);
    const maker = await db.maker.findUniqueOrThrow({
      where: { name: MAKER_NAME },
    });
    expect(maker.id).toBeDefined();
    expect(maker.name).toEqual(MAKER_NAME);
  });
});
