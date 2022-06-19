import { postStockAlert } from '@/services/api/discordApi/notifiers/stock';
import type { PostStockAlertVariables } from './types';

type Products = {
  [id: number]: {
    id: number;
    name: string;
    stockIds: number[];
  };
};

const getProductLines = (stocks: PostStockAlertVariables): string => {
  const products = stocks.reduce((products, currentStock) => {
    const product = products[currentStock.product_id];
    if (product) {
      return {
        ...products,
        [product.id]: {
          ...product,
          stockIds: [...product.stockIds, currentStock.id],
        },
      };
    }
    return {
      ...products,
      [currentStock.product_id]: {
        id: currentStock.product_id,
        name: currentStock.product.name,
        stockIds: [currentStock.id],
      },
    };
  }, {} as Products);

  return Object.values(products)
    .map(
      (product) =>
        `\n${product.name}の在庫id:${product.stockIds.join(
          ','
        )} =>  https://ham-media-app.net/admin/products/${product.id}`
    )
    .join();
};

export const postStockExpiringInWeekAlert = (
  stocks: PostStockAlertVariables
): void => {
  const lines = getProductLines(stocks);

  postStockAlert(
    `===== 今週はこの在庫の期限が切れちゃうよ <:doyouebest:844132000788643860> ===== ${lines}\n`
  );
};

export const postStockExpiringInMonthAlert = (
  stocks: PostStockAlertVariables
): void => {
  const lines = getProductLines(stocks);

  postStockAlert(
    `===== 3ヶ月以内にこの在庫の期限が切れちゃうよ <:doyouebest:913298500861698058> ===== ${lines}\n`
  );
};
