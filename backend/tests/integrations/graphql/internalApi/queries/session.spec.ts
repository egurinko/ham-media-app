import { setup } from '@tests/utils/setupInternalApi';
import gql from 'graphql-tag';

const QUERY = gql`
  query {
    session {
      token
      internalUser {
        id
        name
        email
      }
    }
  }
`;

describe('session', () => {
  it('returns session', async () => {
    const client = await setup();

    const result = await client.query(QUERY);

    const session = result.data['session'];
    expect(session.token).toBeDefined();
    expect(session.internalUser.name).toEqual('admin');
    expect(session.internalUser.email).toEqual('test@example.com');
  });
});
