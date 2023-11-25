import * as line from '@line/bot-sdk';

const client = new line.messagingApi.MessagingApiClient({
  channelAccessToken: process.env['LINE_CHANNEL_ACCESS_TOKEN'] || '',
});

line.middleware({
  channelAccessToken: process.env['LINE_CHANNEL_ACCESS_TOKEN'] || '',
  channelSecret: process.env['LINE_CHANNEL_SECRET'] || '',
});

export { client };
