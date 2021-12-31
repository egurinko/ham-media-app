import { objectType } from 'nexus';
import { StockRequestStockRegistration } from 'nexus-prisma';

export const stockRegistrationType = objectType({
  name: StockRequestStockRegistration.$name,
  description: StockRequestStockRegistration.$description,
  definition(t) {
    t.field(StockRequestStockRegistration.id);
    t.field(StockRequestStockRegistration.stock);
  },
});
