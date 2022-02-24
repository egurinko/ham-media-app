import { setup } from '@tests/utils/setupPublicApi';
import gql from 'graphql-tag';
import { client as db } from '@/services/prisma';

const QUERY = gql`
  query {
    prefectures {
      id
      name
      region {
        name
      }
    }
  }
`;

const REGION_NAME = 'region';
const PREFECTURE_NAME = 'prefecture';

const setupData = async () => {
  const region = await db.region.create({ data: { name: REGION_NAME } });
  return db.prefecture.create({
    data: { name: PREFECTURE_NAME, region_id: region.id },
  });
};

describe('prefectures', () => {
  beforeEach(() => {
    return setupData();
  });

  it('returns prefectures', async () => {
    const client = await setup();

    const result = await client.query(QUERY);

    const prefectures = result.data['prefectures'];
    expect(prefectures.length).toEqual(1);

    expect(prefectures[0].name).toEqual(PREFECTURE_NAME);
    expect(prefectures[0].region.name).toEqual(REGION_NAME);
  });
});
