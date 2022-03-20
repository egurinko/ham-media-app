import type {
  Product,
  StockRequest,
  InternalUser,
  StockRequestProductRegistration,
} from '@prisma/client';

export type PostStockRequestAlertVariables = StockRequest & {
  internalUser: InternalUser;
  productRegistrations: (StockRequestProductRegistration & {
    product: Product;
  })[];
};
