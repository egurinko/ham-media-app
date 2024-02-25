import type {
  TextMessage,
  FlexMessage,
  FlexBubble,
  FlexBox,
  FlexImage,
  URIAction,
  Action,
} from '@line/bot-sdk';
import type {
  GetOfferingHamstersResponse,
  GetOfferingHamsterResponse,
} from '@/services/api';
import { sanitizeHtml } from '@/services/htmlSanitizer';

export const createNoOfferingHamstersReplyMessage: TextMessage = {
  type: 'text',
  text: '現在募集中の子はいません。',
};

export const createWordpressErrorReplyMessage: TextMessage = {
  type: 'text',
  text: '大変申し訳ありません。現在里親募集中一覧のハムスター一覧をご利用することができません。しばらく時間を置いてから再度アクセスしてください。',
};

export const createOfferingHamstersReplyMessage = (
  offeringHamstersPosts: GetOfferingHamstersResponse,
): FlexMessage => ({
  type: 'flex',
  altText: '里親募集ハムスター一覧',
  contents: {
    type: 'carousel',
    contents: offeringHamstersPosts.map((post) =>
      createOfferingHamstersCarouselContent(post),
    ),
  },
});

const createOfferingHamstersCarouselContent = (
  post: GetOfferingHamsterResponse,
): FlexBubble => ({
  type: 'bubble',
  hero: createHero(post),
  body: createBody(post),
  footer: createFooter(post.link),
});

const createHero = (post: GetOfferingHamsterResponse): FlexImage => ({
  type: 'image',
  url: post.better_featured_image
    ? post.better_featured_image.source_url
    : 'https://ham-media.net/wp-content/uploads/2020/02/item.png',
  size: 'full',
  aspectRatio: '20:13',
  aspectMode: 'cover',
  action: createHeroAction(post.link) as Action,
});

const createHeroAction = (link: string): URIAction => ({
  type: 'uri',
  uri: link,
});

const createBody = (post: GetOfferingHamsterResponse): FlexBox => {
  const content = sanitizeHtml(post.content.rendered, {
    allowedTags: [],
    allowedAttributes: {},
  });

  return {
    type: 'box',
    layout: 'vertical',
    contents: [
      {
        type: 'text',
        text: post.title.rendered,
        weight: 'bold',
        size: 'xl',
        wrap: true,
      },
      {
        type: 'box',
        layout: 'vertical',
        margin: 'lg',
        spacing: 'sm',
        contents: [
          {
            type: 'box',
            layout: 'baseline',
            spacing: 'sm',
            contents: [
              {
                type: 'text',
                text: '仮名',
                color: '#aaaaaa',
                size: 'md',
                flex: 2,
                decoration: 'underline',
              },
              {
                type: 'text',
                text: content.split('仮名')[1]?.split('\n')[0] || '',
                wrap: true,
                color: '#666666',
                size: 'md',
                flex: 5,
              },
            ],
          },
          {
            type: 'box',
            layout: 'baseline',
            spacing: 'sm',
            contents: [
              {
                type: 'text',
                text: '性別',
                color: '#aaaaaa',
                size: 'md',
                flex: 2,
                decoration: 'underline',
              },
              {
                type: 'text',
                text: content.split('性別')[1]?.split('\n')[0] || '',
                wrap: true,
                color: '#666666',
                size: 'md',
                flex: 5,
              },
            ],
          },
          {
            type: 'box',
            layout: 'baseline',
            spacing: 'sm',
            contents: [
              {
                type: 'text',
                text: '生年月日',
                color: '#aaaaaa',
                size: 'md',
                flex: 2,
                decoration: 'underline',
              },
              {
                type: 'text',
                text: content.split('生年月日')[1]?.split('\n')[0] || '',
                wrap: true,
                color: '#666666',
                size: 'md',
                flex: 5,
              },
            ],
          },
        ],
      },
    ],
  };
};

const createFooter = (link: string): FlexBox => ({
  type: 'box',
  layout: 'vertical',
  spacing: 'sm',
  contents: [
    {
      type: 'button',
      style: 'link',
      height: 'sm',
      action: {
        type: 'uri',
        label: '詳しくみる',
        uri: link,
      },
    },
    {
      type: 'spacer',
      size: 'sm',
    },
  ],
  flex: 0,
});
