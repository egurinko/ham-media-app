import { objectType } from 'nexus';
import { Cart } from 'nexus-prisma';

export const cartType = objectType({
  name: Cart.$name,
  description: Cart.$description,
  definition(t) {
    t.field(Cart.id);
    t.nonNull.field('items', { type: 'JSONObject' });
  },
});
