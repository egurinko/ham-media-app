import { Providers } from '@/app/providers';
import { OG_DEFAULT_IMAGE, SERVICE_NAME } from '@/utils/constant';
import { GOOGLE_TAG_MANAGER_ID } from '@/utils/googleTagManager';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: SERVICE_NAME,
  description:
    '１匹でも多くのハムスターのしあわせを未来につないでいきたい。様々な理由で助けが必要になったハムスターの里親を募集しています。',
  icons: '/favicon.png',
  keywords: [
    'ハムスター受付病院',
    '動物病院',
    'ハムスター',
    'ハムメディア',
    SERVICE_NAME,
  ],
  openGraph: {
    type: 'website',
    url: 'https://www.ham-media-app.net',
    title: SERVICE_NAME,
    description:
      '１匹でも多くのハムスターのしあわせを未来につないでいきたい。様々な理由で助けが必要になったハムスターの里親を募集しています。',
    siteName: SERVICE_NAME,
    images: OG_DEFAULT_IMAGE,
  },
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="ja">
      <body>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GOOGLE_TAG_MANAGER_ID}`}
            height="0"
            width="0"
            style={{
              display: 'none',
              visibility: 'hidden',
            }}
            title="googleTagManagerNoScript"
          />
        </noscript>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
