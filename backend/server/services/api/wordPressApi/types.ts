type GetOfferingHamstersResponse = GetOfferingHamsterResponse[];

type GetOfferingHamsterResponse = {
  id: number;
  date: string;
  date_gmt: string;
  guid: { rendered: string };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: { rendered: string };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: { rendered: string; protected: boolean };
  author: number;
  featured_media: number;
  comment_status: string;
  ping_status: string;
  sticky: false;
  template: string;
  format: string;
  meta: [];
  categories: number[];
  tags: number[];
  better_featured_image?: {
    id: string;
    alt_text: string;
    caption: string;
    description: string;
    media_type: string;
    media_details: Object[];
    post: number;
    source_url: string;
  };
  yoast_head: string;
  yoast_head_json: {
    title: string;
    robots: {
      index: string;
      follow: string;
      'max-snippet': string;
      'max-image-preview': string;
      'max-video-preview': string;
    };
    canonical: 'https://ham-media.net/activities/rescued/ham060/';
    og_locale: 'ja_JP';
    og_type: 'article';
    og_title: 'ゴールデンハムスター(クリーム)を保護しました【060】 - Ham ω Media';
    og_description: '■HAM管理番号 060';
    og_url: 'https://ham-media.net/activities/rescued/ham060/';
    og_site_name: 'Ham ω Media';
    article_publisher: 'https://www.facebook.com/pg/hamwmedia/';
    article_published_time: '2021-09-19T02:52:26+00:00';
    article_modified_time: '2021-10-16T18:25:02+00:00';
    og_image: Object[];
    twitter_card: 'summary_large_image';
    twitter_creator: '@ham_edia';
    twitter_site: '@ham_edia';
    twitter_misc: { 執筆者: string; 推定読み取り時間: string };
    schema: { '@context': string; '@graph': Object[] };
  };
  _links: {
    self: Object[];
    collection: Object[];
    about: Object[];
    author: Object[];
    replies: Object[];
    'version-history': Object[];
    'predecessor-version': Object[];
    'wp:featuredmedia': Object[];
    'wp:attachment': Object[];
    'wp:term': Object[];
    curies: Object[];
  };
};

export type { GetOfferingHamstersResponse, GetOfferingHamsterResponse };
