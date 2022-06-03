import NextHead from 'next/head';
import { SERVICE_NAME } from '@/utils/constant';

type Props = {
  title?: string;
  description?: string;
  ogpUrl?: string;
  ogpImageUrl?: string;
  keywords?: string;
};

const Head: React.FC<Props> = ({
  title = SERVICE_NAME,
  description = '１匹でも多くのハムスターのしあわせを未来につないでいきたい。様々な理由で助けが必要になったハムスターの里親を募集しています。',
  ogpUrl = 'https://ham-media.net/hospitals',
  ogpImageUrl = 'https://user-images.githubusercontent.com/23233648/138548265-89dbff65-9737-42db-8d4e-591168374f88.jpeg',
  keywords = `動物病院,ハムスター受付病院,ハムスター,ハムメディア,${SERVICE_NAME}`,
}) => (
  <NextHead>
    <title>{title}</title>
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <meta name="description" content={description} />
    <meta property="og:url" content={ogpUrl} />
    <meta property="og:title" content={title} />
    <meta property="og:site_name" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content="website" />
    <meta property="og:image" content={ogpImageUrl} />
    <meta name="keywords" content={keywords} />
    <link rel="canonical" href={ogpUrl} />
    <meta name="keywords" content={keywords} />
    <link rel="icon" href="/favicon.png" />
  </NextHead>
);

export { Head };
