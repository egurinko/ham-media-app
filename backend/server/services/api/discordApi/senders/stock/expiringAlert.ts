import { postStockAlert } from '@/services/api/discordApi/notifiers/stock';
import type { PostStockAlertVariables } from './types';
import { sliceByNumber } from '@/services/functions';

type Products = {
  [id: number]: {
    id: number;
    name: string;
    stockIds: number[];
  };
};

const getStockAlertLinesByProduct = (
  stocks: PostStockAlertVariables
): string[] => {
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

  return Object.values(products).map(
    (product) =>
      `\n${product.name}の在庫id:${product.stockIds.join(
        ','
      )} =>  https://ham-media-app.net/admin/products/${product.id}`
  );
};

const getStockAlertContents = (stocks: PostStockAlertVariables): string[] => {
  const stockAlertLines = getStockAlertLinesByProduct(stocks);

  // discord の文字制限に引っかからないようにメッセージを分割する
  return sliceByNumber<string>(stockAlertLines, 10).map((lines) =>
    lines.join()
  );
};

export const postStockAlertContents = (
  stocks: PostStockAlertVariables
): Promise<any> => {
  const stockAlertContents = getStockAlertContents(stocks);
  return Promise.all(
    stockAlertContents.map((content) => postStockAlert(content))
  );
};

export const postStockExpiringInWeekAlert = async (
  stocks: PostStockAlertVariables
): Promise<any> => {
  await postStockAlert(
    `===== 今週はこの在庫の期限が切れちゃうよ <:doyouebest:844132000788643860> =====`
  );

  return postStockAlertContents(stocks);
};

export const postStockExpiringInMonthAlert = async (
  stocks: PostStockAlertVariables
): Promise<any> => {
  await postStockAlert(
    `===== 3ヶ月以内にこの在庫の期限が切れちゃうよ <:__:990474403185836062> =====`
  );
  return postStockAlertContents(stocks);
};
