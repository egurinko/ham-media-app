import { setup } from '@tests/utils/setupPublicApi';
import gql from 'graphql-tag';

const QUERY = gql`
  query {
    prefectures {
      id
      name
    }
  }
`;

describe('prefectures', () => {
  it('true to be true', async () => {
    const client = await setup();

    const result = await client.query(QUERY);

    const prefectures = result.data['prefectures'];
    expect(prefectures.length).toEqual(47);
  });
});
