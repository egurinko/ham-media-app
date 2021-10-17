import * as line from '@line/bot-sdk';

const config = {
  channelAccessToken: process.env['LINE_CHANNEL_ACCESS_TOKEN'] || '',
  channelSecret: process.env['LINE_CHANNEL_SECRET'] || '',
};

const client = new line.Client(config);
// const middleware = line.middleware(config);

export { client };
