import { Providers } from '@/app/providers';
import { GOOGLE_TAG_MANAGER_ID } from '@/utils/googleTagManager';

const RootLayout =
  () =>
  ({ children }: { children: React.ReactNode }) => (
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

export default RootLayout;
