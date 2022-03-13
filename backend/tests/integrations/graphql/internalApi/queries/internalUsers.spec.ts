import { setup } from '@tests/utils/setupInternalApi';
import gql from 'graphql-tag';
import { client as db } from '@/services/prisma';

const QUERY = gql`
  query {
    internalUsers {
      id
      name
      email
      discord_user_id
    }
  }
`;

const ROLE_NAME = 'roleName';
const INTERNAL_USER_NAME_1 = 'internalUserName1';
const INTERNAL_USER_EMAIL_1 = 'example@test.com1';
const INTERNAL_USER_DISCORD_USER_ID_1 = 'internalUserDiscordUserId1';

const init = async () => {
  const role = await db.role.create({ data: { name: ROLE_NAME } });
  await db.internalUser.createMany({
    data: [
      {
        name: INTERNAL_USER_NAME_1,
        email: INTERNAL_USER_EMAIL_1,
        discord_user_id: INTERNAL_USER_DISCORD_USER_ID_1,
        password_digest: '',
        role_id: role.id,
      },
    ],
  });
};

describe('internalUsers', () => {
  beforeEach(async () => {
    await init();
  });

  it('returns all internalUsers', async () => {
    const client = await setup();

    const result = await client.query(QUERY);

    const internalUsers = result.data['internalUsers'];
    // seed has one internal user
    expect(internalUsers.length).toEqual(2);

    expect(internalUsers[0].name).toEqual('admin');
    expect(internalUsers[0].email).toEqual('test@example.com');
    expect(internalUsers[0].discord_user_id).toEqual('');
    expect(internalUsers[1].name).toEqual(INTERNAL_USER_NAME_1);
    expect(internalUsers[1].email).toEqual(INTERNAL_USER_EMAIL_1);
    expect(internalUsers[1].discord_user_id).toEqual(
      INTERNAL_USER_DISCORD_USER_ID_1
    );
  });
});
