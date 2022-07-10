import { postStockAlert } from '@/services/api/discordApi/notifiers/stock';
import type { PostStockAlertVariables } from './types';
import { getProductLines } from './expiringAlert';

export const postStockExpirationAlert = (
  stocks: PostStockAlertVariables
): void => {
  const lines = getProductLines(stocks);

  postStockAlert(
    `===== 以下の在庫の期限が切れているよ <:shock:844862291215122432> ===== ${lines}\n`
  );
};
