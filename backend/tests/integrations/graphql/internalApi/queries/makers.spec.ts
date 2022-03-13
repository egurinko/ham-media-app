import { setup } from '@tests/utils/setupInternalApi';
import gql from 'graphql-tag';
import { client as db } from '@/services/prisma';

const QUERY = gql`
  query {
    makers {
      id
      name
    }
  }
`;

const MAKER_NAME_1 = 'makerName1';
const MAKER_NAME_2 = 'makerName2';

const init = async () => {
  await db.maker.createMany({
    data: [{ name: MAKER_NAME_1 }, { name: MAKER_NAME_2 }],
  });
};

describe('makers', () => {
  beforeEach(async () => {
    await init();
  });

  it('returns all makers', async () => {
    const client = await setup();

    const result = await client.query(QUERY);

    const makers = result.data['makers'];
    expect(makers.length).toEqual(2);

    expect(makers[0].name).toEqual(MAKER_NAME_1);
    expect(makers[1].name).toEqual(MAKER_NAME_2);
  });
});
