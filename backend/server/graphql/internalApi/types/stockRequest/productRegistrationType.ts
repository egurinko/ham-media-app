import { objectType } from 'nexus';
import { StockRequestProductRegistration } from 'nexus-prisma';

export const productRegistrationType = objectType({
  name: StockRequestProductRegistration.$name,
  description: StockRequestProductRegistration.$description,
  definition(t) {
    t.field(StockRequestProductRegistration.id);
    t.field(StockRequestProductRegistration.product);
  },
});
