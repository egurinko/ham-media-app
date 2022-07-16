import { setup } from '@tests/utils/setupInternalApi';
import gql from 'graphql-tag';
import { client as db } from '@/services/prisma';

const QUERY = gql`
  mutation ($id: BigInt!) {
    deleteInternalUser(id: $id) {
      deleted
    }
  }
`;

describe('deleteInternalUser', () => {
  const INTERNAL_USER_ID = 10;

  const variables = {
    id: INTERNAL_USER_ID,
  };

  beforeEach(async () => {
    const role = await db.role.create({ data: { name: 'roleName' } });
    await db.internalUser.create({
      data: {
        id: INTERNAL_USER_ID,
        name: 'internalUserName',
        email: 'internal@user.example',
        discord_user_id: 'discordUserId',
        password_digest: 'passwordDigest',
        role_id: role.id,
      },
    });
  });

  it('returns deleted', async () => {
    const client = await setup();

    const result = await client.mutate(QUERY, {
      variables,
    });

    expect(result.errors).toBeUndefined();

    const deleteInternalUser = result.data['deleteInternalUser'];
    expect(deleteInternalUser.deleted).toBe(true);
  });

  it('delete internal user', async () => {
    const beforeCount = await db.internalUser.count();
    expect(beforeCount).toBe(2);

    const client = await setup();
    await client.mutate(QUERY, { variables });

    const afterCount = await db.internalUser.count();
    expect(afterCount).toBe(1);
  });
});
