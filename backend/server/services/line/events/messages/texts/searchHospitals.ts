import type { TextMessage } from '@line/bot-sdk';

export const SEARCH_HOSPITALS_REPLAY_MESSAGE: TextMessage = {
  type: 'text',
  text: '検索のご利用ありがとうございます。現在地からの検索、夜間営業病院の検索をご利用できます。どちらか選択してください。',
  quickReply: {
    items: [
      {
        type: 'action',
        imageUrl:
          'https://user-images.githubusercontent.com/23233648/137619190-89632b1f-9829-423e-b491-8b70ada62dd8.png',
        action: {
          type: 'location',
          label: '現在地から',
        },
      },
      {
        type: 'action',
        imageUrl:
          'https://user-images.githubusercontent.com/23233648/137619193-b040d06f-b6fe-43f3-93cc-51d4981044f3.png',
        action: {
          type: 'message',
          label: '夜間営業病院から',
          text: '夜間営業病院を検索',
        },
      },
    ],
  },
};
