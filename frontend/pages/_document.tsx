import { Html, Head, Main, NextScript } from 'next/document';
import { GOOGLE_TAG_MANAGER_ID } from '@/utils/googleTagManager';

const Document = () => (
  <Html>
    <Head />
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
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
