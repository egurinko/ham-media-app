import { setup } from '@tests/utils/setupInternalApi';
import gql from 'graphql-tag';

const QUERY = gql`
  query {
    roles {
      id
      name
    }
  }
`;

describe('roles', () => {
  it('returns roles', async () => {
    const client = await setup();

    const result = await client.query(QUERY);

    const roles = result.data['roles'];
    expect(roles[0].id).toEqual(1);
    expect(roles[0].name).toEqual('admin');
    expect(roles[1].id).toEqual(2);
    expect(roles[1].name).toEqual('user');
  });
});
