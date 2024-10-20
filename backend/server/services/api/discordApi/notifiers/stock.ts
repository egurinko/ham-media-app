import axios from 'axios';

export const client = axios.create({});

const DISCORD_STOCK_WEBHOOK_URL = process.env['DISCORD_STOCK_WEBHOOK_URL'];
const DISCORD_USER_NAME = '在庫管理大臣';
const DISCORD_AVATAR_URL =
  'https://user-images.githubusercontent.com/23233648/155543196-5043b4d5-58c9-4552-8a33-43784596c06b.png';

// https://discord.com/developers/docs/resources/webhook#webhook-object
type WEBHOOK = {
  id: string;
  type: number;
};

export type WEBHOOK_RESPONSE = axios.AxiosResponse<WEBHOOK> | void;

export const postStockAlert = (
  content: string,
): Promise<WEBHOOK_RESPONSE> | void => {
  if (!DISCORD_STOCK_WEBHOOK_URL) return;

  return client.post<WEBHOOK>(DISCORD_STOCK_WEBHOOK_URL, {
    username: DISCORD_USER_NAME,
    avatar_url: DISCORD_AVATAR_URL,
    content,
  });
};
