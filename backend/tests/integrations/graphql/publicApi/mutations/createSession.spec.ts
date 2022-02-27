import { setup } from '@tests/utils/setupPublicApi';
import gql from 'graphql-tag';
import { hash } from 'bcrypt';
import { sign } from '@/services/authentication';
import { client as db } from '@/services/prisma';

const QUERY = gql`
  mutation ($email: String!, $password: String!) {
    createSession(email: $email, password: $password) {
      token
    }
  }
`;

const ROLE_NAME = 'roleName';
const INTERNAL_USER_NAME = 'internalUserName';
const INTERNAL_USER_EMAIL = 'test@internal.com';
const INTERNAL_USER_PASSWORD = 'internalUserPassword';

const setupData = async () => {
  const role = await db.role.create({
    data: { name: ROLE_NAME },
  });
  const hashedPassword = await hash(INTERNAL_USER_PASSWORD, 8);
  await db.internalUser.create({
    data: {
      discord_user_id: '',
      name: INTERNAL_USER_NAME,
      email: INTERNAL_USER_EMAIL,
      password_digest: hashedPassword,
      role_id: role.id,
    },
  });
};

describe('createSession', () => {
  beforeEach(async () => {
    await setupData();
  });

  describe('with valid params', () => {
    it('returns token', async () => {
      const client = await setup();

      const result = await client.query(QUERY, {
        variables: {
          email: INTERNAL_USER_EMAIL,
          password: INTERNAL_USER_PASSWORD,
        },
      });

      expect(result.errors).toBeUndefined();

      const createSession = result.data['createSession'];
      expect(createSession.token).toEqual(sign({ email: INTERNAL_USER_EMAIL }));
    });
  });

  describe('with invalid params', () => {
    describe('with unexisting internal user', () => {
      it('returns not found error', async () => {
        const client = await setup();

        const result = await client.query(QUERY, {
          variables: {
            email: 'invalid@example.com',
            password: INTERNAL_USER_PASSWORD,
          },
        });

        expect(result.data).toBeNull();
        const error = result.errors![0];
        expect(error?.message).toEqual('No InternalUser found');
        expect(error?.path).toEqual(['createSession']);
      });
    });

    describe('with invalid password', () => {
      it('returns authentication error', async () => {
        const client = await setup();

        const result = await client.query(QUERY, {
          variables: {
            email: INTERNAL_USER_EMAIL,
            password: 'invalidPassword',
          },
        });

        expect(result.data).toBeNull();
        const error = result.errors![0];
        expect(error?.message).toEqual('Authentication Error');
        expect(error?.path).toEqual(['createSession']);
      });
    });
  });
});
