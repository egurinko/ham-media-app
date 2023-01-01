import { Providers } from '@/app/providers';
import { GOOGLE_TAG_MANAGER_ID } from '@/utils/googleTagManager';

export default function Layout({ children }: { children: React.ReactNode }) {
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
