import type {
  TextMessage,
  FlexMessage,
  FlexBubble,
  FlexBox,
  FlexImage,
  URIAction,
  Action,
} from '@line/bot-sdk';
import { wordPressApi } from '@/services/api';
import type {
  GetOfferingHamstersResponse,
  GetOfferingHamsterResponse,
} from '@/services/api';

export const getListOfferingHamstersReplyMessage = async (): Promise<
  TextMessage | FlexMessage
> => {
  try {
    const response = await wordPressApi.getOfferingHamsters();
    if (response.data.length === 0) {
      return NO_OFFERING_HAMSTERS_MESSAGE;
    } else {
      const sliced = response.data.slice(0, 10);
      return getOfferingHamstersCarousel(sliced);
    }
  } catch (_e) {
    return {
      type: 'text',
      text: '大変申し訳ありません。現在里親募集中一覧のハムスター一覧をご利用することができません。しばらく時間を置いてから再度アクセスしてください。',
    };
  }
};

const NO_OFFERING_HAMSTERS_MESSAGE: TextMessage = {
  type: 'text',
  text: '現在募集中の子はいません。',
};

const getOfferingHamstersCarousel = (
  offeringHamstersPosts: GetOfferingHamstersResponse
): FlexMessage => ({
  type: 'flex',
  altText: '里親募集ハムスター一覧',
  contents: {
    type: 'carousel',
    contents: offeringHamstersPosts.map((post) =>
      getOfferingHamstersCarouselContent(post)
    ),
  },
});

const getOfferingHamstersCarouselContent = (
  post: GetOfferingHamsterResponse
): FlexBubble => ({
  type: 'bubble',
  hero: getHero(post),
  body: getBody(post),
  footer: getFooter(post.link),
});

const getHero = (post: GetOfferingHamsterResponse): FlexImage => ({
  type: 'image',
  url: post.better_featured_image
    ? post.better_featured_image.source_url
    : 'https://ham-media.net/wp-content/uploads/2020/02/item.png',
  size: 'full',
  aspectRatio: '20:13',
  aspectMode: 'cover',
  action: getHeroAction(post.link) as Action,
});

const getHeroAction = (link: string): URIAction => ({
  type: 'uri',
  uri: link,
});

const getBody = (post: GetOfferingHamsterResponse): FlexBox => {
  const content = post.content.rendered;

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
                text: content.split('仮名')[1]?.split('\n')[1] || '',
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
                text: content.split('性別')[1]?.split('\n')[1] || '',
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
                text: content.split('生年月日')[1]?.split('\n')[1] || '',
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

const getFooter = (link: string): FlexBox => ({
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
