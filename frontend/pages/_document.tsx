import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

const GTM_CONTAINER_ID = process.env['GTM_CONTAINER_ID'];

const Document = () => (
  <Html>
    <Head>
      <Script
        id="googleTagManager"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', '${GTM_CONTAINER_ID}');
            `,
        }}
      />
    </Head>
    <body>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}`}
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
