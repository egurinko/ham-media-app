import Head from 'next/head';

type Props = {
  title: string;
  description: string;
  ogpUrl: string;
  ogpImageUrl: string;
};

const HeadComponent: React.VFC<Props> = ({
  title,
  description,
  ogpImageUrl,
  ogpUrl,
}) => (
  <Head>
    <title>{title}</title>
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <meta name="description" content={description} />
    <meta property="og:url" content={ogpUrl} />
    <meta property="og:title" content={title} />
    <meta property="og:site_name" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content="website" />
    <meta property="og:image" content={ogpImageUrl} />
    <link rel="icon" href="/favicon.png" />
  </Head>
);

export default HeadComponent;
