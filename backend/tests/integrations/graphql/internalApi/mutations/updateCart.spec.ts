import { setup } from '@tests/utils/setupInternalApi';
import gql from 'graphql-tag';
import { client as db } from '@/services/prisma';

const QUERY = gql`
  mutation ($id: Int!, $items: JSONObject!) {
    updateCart(id: $id, items: $items) {
      id
      items
    }
  }
`;

describe('updateCart', () => {
  const ROLE_ID = 10;
  const ROLE_NAME = 'roleName';
  const INTERNAL_USER_ID = 20;
  const CART_ID = 30;
  const CART_ITEMS = {
    productId1: {
      stockIds: [1, 2],
    },
    productId2: {
      stockIds: [3, 4],
    },
  };

  beforeEach(async () => {
    const role = await db.role.create({
      data: { id: ROLE_ID, name: ROLE_NAME },
    });
    const user = await db.internalUser.create({
      data: {
        id: INTERNAL_USER_ID,
        name: 'internalUserName',
        email: 'internal@user.example',
        discord_user_id: 'discordUserId',
        password_digest: 'passwordDigest',
        role_id: role.id,
      },
    });
    await db.cart.create({
      data: {
        id: CART_ID,
        internal_user_id: user.id,
        items: CART_ITEMS,
      },
    });
  });

  it('returns cart', async () => {
    const client = await setup();

    const afterCartItems = {
      productId3: {
        stockIds: [10],
      },
    };
    const result = await client.query(QUERY, {
      variables: {
        id: CART_ID,
        items: afterCartItems,
      },
    });

    expect(result.errors).toBeUndefined();

    const updateCart = result.data['updateCart'];
    expect(updateCart.id).toEqual(CART_ID);
    expect(updateCart.items).toEqual(afterCartItems);
  });

  it('update cart', async () => {
    const before = await db.cart.findUniqueOrThrow({
      where: { id: CART_ID },
    });
    expect(before.items).toEqual(CART_ITEMS);

    const client = await setup();
    const afterCartItems = {
      productId3: {
        stockIds: [10],
      },
    };
    await client.query(QUERY, {
      variables: {
        id: CART_ID,
        items: afterCartItems,
      },
    });

    const cart = await db.cart.findUniqueOrThrow({
      where: { id: CART_ID },
    });
    expect(cart.id).toEqual(CART_ID);
    expect(cart.items).toEqual(afterCartItems);
  });
});
