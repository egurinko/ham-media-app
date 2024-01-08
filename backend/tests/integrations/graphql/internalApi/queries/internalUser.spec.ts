import { setup } from '@tests/utils/setupInternalApi';
import gql from 'graphql-tag';
import { client as db } from '@/services/prisma';

const QUERY = gql`
  query ($id: BigInt!) {
    internalUser(id: $id) {
      id
      name
      email
      discord_user_id
      role {
        name
      }
      cart {
        id
        items
      }
    }
  }
`;

const ROLE_NAME = 'roleName';
const INTERNAL_USER_ID_1 = 10;
const INTERNAL_USER_NAME_1 = 'internalUserName1';
const INTERNAL_USER_EMAIL_1 = 'example@test.com1';
const INTERNAL_USER_DISCORD_USER_ID_1 = 'internalUserDiscordUserId1';

const init = async () => {
  const role = await db.role.create({ data: { name: ROLE_NAME } });
  const internalUser = await db.internalUser.create({
    data: {
      id: INTERNAL_USER_ID_1,
      name: INTERNAL_USER_NAME_1,
      email: INTERNAL_USER_EMAIL_1,
      discord_user_id: INTERNAL_USER_DISCORD_USER_ID_1,
      password_digest: '',
      role_id: role.id,
    },
  });
  await db.cart.create({
    data: {
      internal_user_id: internalUser.id,
      items: {
        productId1: {
          stockIds: [1],
        },
      },
    },
  });
};

describe('internalUser', () => {
  beforeEach(async () => {
    await init();
  });

  describe('with valid params', () => {
    it('returns  internalUser', async () => {
      const client = await setup();

      const result = await client.query(QUERY, {
        variables: { id: INTERNAL_USER_ID_1 },
      });
      const internalUser = result.data['internalUser'];

      expect(internalUser.id).toEqual(INTERNAL_USER_ID_1);
      expect(internalUser.name).toEqual(INTERNAL_USER_NAME_1);
      expect(internalUser.email).toEqual(INTERNAL_USER_EMAIL_1);
      expect(internalUser.discord_user_id).toEqual(
        INTERNAL_USER_DISCORD_USER_ID_1,
      );
      expect(internalUser.role.name).toEqual(ROLE_NAME);
      expect(internalUser.cart).toBeDefined();
    });
  });

  describe('with invalid params', () => {
    it('returns not found', async () => {
      const client = await setup();

      const result = await client.query(QUERY, {
        variables: { id: 2000 },
      });

      expect(result.errors![0]?.message).toEqual('No InternalUser found');
    });
  });
});
