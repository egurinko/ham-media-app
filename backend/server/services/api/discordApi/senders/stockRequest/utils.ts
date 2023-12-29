import type { Product } from '@prisma/client';
import type { PostStockRequestAlertVariables } from './types';

type StockRequestCounts = StockRequestCount[];
type StockRequestCount = {
  product: Product;
  count: number;
};

export const createStockRequestCounts = (
  stockRequest: PostStockRequestAlertVariables,
): StockRequestCounts =>
  stockRequest.productRegistrations.reduce((acc, productRegistration) => {
    const found = acc.find(
      (stockRequestCount) =>
        stockRequestCount.product.id === productRegistration.product.id,
    );
    if (!found) {
      return [...acc, { product: productRegistration.product, count: 1 }];
    } else {
      return [
        ...acc.filter(
          (stockRequestCount) =>
            stockRequestCount.product.id !== productRegistration.product.id,
        ),
        {
          product: productRegistration.product,
          count: found.count + 1,
        },
      ];
    }
  }, [] as StockRequestCounts);
