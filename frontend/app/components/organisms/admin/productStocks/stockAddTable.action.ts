'use server';

import { createStocks } from './stockAddTable.api';
import type { CreateStocksMutationVariables } from './stockAddTable.api.generated';

export async function createStocksAction(
  productId: CreateStocksMutationVariables['productId'],
  stocks: CreateStocksMutationVariables['stocks'],
) {
  try {
    await createStocks({
      productId,
      stocks,
    });
    return {
      message: `在庫を作成しました。`,
    };
  } catch {
    return {
      message: `在庫作成に失敗しました。`,
    };
  }
}
