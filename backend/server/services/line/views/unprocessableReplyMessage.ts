import type { TextMessage } from '@line/bot-sdk';

export const createUnprocessableReplyMessage: TextMessage = {
  type: 'text',
  text: '大変申し訳ありません。入力内容を処理できませんでした。\n\nメニューから「受付病院検索」や「里親募集中一覧」、「お問い合わせ」をタップしてください！',
};
