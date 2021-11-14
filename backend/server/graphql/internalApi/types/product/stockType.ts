import { objectType } from 'nexus';
import { Stock } from 'nexus-prisma';

export const stockType = objectType({
  name: Stock.$name,
  description: Stock.$description,
  definition(t) {
    t.field(Stock.id);
    t.field(Stock.expired_at);
  },
});
