import { setup } from '@tests/utils/setupInternalApi';
import gql from 'graphql-tag';
import { client as db } from '@/services/prisma';

const QUERY = gql`
  mutation ($id: Int!) {
    deleteMaker(id: $id) {
      deleted
    }
  }
`;

describe('deleteMaker', () => {
  const MAKER_ID = 10;

  const variables = {
    id: MAKER_ID,
  };

  beforeEach(async () => {
    await db.maker.create({ data: { id: MAKER_ID, name: 'makerName' } });
  });

  it('returns deleted', async () => {
    const client = await setup();

    const result = await client.mutate(QUERY, {
      variables,
    });

    expect(result.errors).toBeUndefined();

    const deleteMaker = result.data['deleteMaker'];
    expect(deleteMaker.deleted).toBe(true);
  });

  it('delete maker', async () => {
    const beforeCount = await db.maker.count();
    expect(beforeCount).toBe(1);

    const client = await setup();
    await client.mutate(QUERY, { variables });

    const afterCount = await db.maker.count();
    expect(afterCount).toBe(0);
  });
});
