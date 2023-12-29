import { setup } from '@tests/utils/setupInternalApi';
import gql from 'graphql-tag';
import { client as db } from '@/services/prisma';

const QUERY = gql`
  mutation (
    $name: String!
    $discord_user_id: String!
    $email: String!
    $password: String!
    $roleId: Int!
  ) {
    createInternalUser(
      name: $name
      discord_user_id: $discord_user_id
      email: $email
      password: $password
      roleId: $roleId
    ) {
      id
      name
      email
      discord_user_id
      role {
        name
      }
    }
  }
`;

describe('createInternalUser', () => {
  const ROLE_ID = 10;
  const ROLE_NAME = 'roleName';
  const INTERNAL_USER_NAME = 'internalUserName';
  const INTERNAL_USER_EMAIL = 'http://internal_user.com';
  const INTERNAL_USER_DISCORD_USER_ID = 'internalUserDiscordUserId';
  const INTERNAL_USER_PASSWORD = 'internalUserPassword';

  beforeEach(async () => {
    await db.role.create({
      data: { id: ROLE_ID, name: ROLE_NAME },
    });
  });

  it('returns internalUser', async () => {
    const client = await setup();

    const result = await client.query(QUERY, {
      variables: {
        name: INTERNAL_USER_NAME,
        discord_user_id: INTERNAL_USER_DISCORD_USER_ID,
        email: INTERNAL_USER_EMAIL,
        password: INTERNAL_USER_PASSWORD,
        roleId: ROLE_ID,
      },
    });

    expect(result.errors).toBeUndefined();

    const createInternalUser = result.data['createInternalUser'];
    expect(createInternalUser.id).toBeDefined();
    expect(createInternalUser.name).toEqual(INTERNAL_USER_NAME);
    expect(createInternalUser.email).toEqual(INTERNAL_USER_EMAIL);
    expect(createInternalUser.discord_user_id).toEqual(
      INTERNAL_USER_DISCORD_USER_ID,
    );
    expect(createInternalUser.role.name).toEqual(ROLE_NAME);
  });

  it('create internalUser', async () => {
    expect(await db.internalUser.count()).toEqual(1);

    const client = await setup();
    await client.query(QUERY, {
      variables: {
        name: INTERNAL_USER_NAME,
        discord_user_id: INTERNAL_USER_DISCORD_USER_ID,
        email: INTERNAL_USER_EMAIL,
        password: INTERNAL_USER_PASSWORD,
        roleId: ROLE_ID,
      },
    });

    expect(await db.internalUser.count()).toEqual(2);
    const internalUser = await db.internalUser.findUniqueOrThrow({
      where: { email: INTERNAL_USER_EMAIL },
      include: { role: true },
    });
    expect(internalUser.id).toBeDefined();
    expect(internalUser.name).toEqual(INTERNAL_USER_NAME);
    expect(internalUser.email).toEqual(INTERNAL_USER_EMAIL);
    expect(internalUser.discord_user_id).toEqual(INTERNAL_USER_DISCORD_USER_ID);
    expect(internalUser.role.name).toEqual(ROLE_NAME);
  });
});
