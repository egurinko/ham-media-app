import { setup } from '@tests/utils/setupInternalApi';
import gql from 'graphql-tag';
import { client as db } from '@/services/prisma';

const QUERY = gql`
  query ($id: Int!) {
    maker(id: $id) {
      id
      name
    }
  }
`;

const MAKER_ID = 1;
const MAKER_NAME = 'makerName';

const init = async () => {
  await db.maker.create({
    data: {
      id: MAKER_ID,
      name: MAKER_NAME,
    },
  });
};

describe('maker', () => {
  beforeEach(async () => {
    await init();
  });

  describe('with valid params', () => {
    it('returns maker', async () => {
      const client = await setup();

      const result = await client.query(QUERY, { variables: { id: MAKER_ID } });

      const maker = result.data['maker'];
      expect(maker.name).toEqual(MAKER_NAME);
    });
  });

  describe('with invalid params', () => {
    it('returns not found', async () => {
      const client = await setup();

      const result = await client.query(QUERY, {
        variables: { id: 2000 },
      });

      expect(result.errors![0]?.message).toEqual('No Maker found');
    });
  });
});
