import { Footer } from '@/app/(consumer)/Footer';
import { Header } from '@/app/(consumer)/Header';
import { NotFound } from '@/app/components/organisms/NotFound';
import { css } from '@/styled/css';
import { SERVICE_NAME, ORIGIN_URL } from '@/utils/constant';
import { NOTFOUND_PATH } from '@/utils/routes';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `お探しのページが見つかりませんでした - ${SERVICE_NAME}`,
  icons: '/favicon.png',
  keywords: ['NotFound', 'ハムスター', 'ハムメディア', SERVICE_NAME],
  openGraph: {
    type: 'website',
    url: `${ORIGIN_URL}${NOTFOUND_PATH}`,
    title: `お探しのページが見つかりませんでした - ${SERVICE_NAME}`,
    siteName: SERVICE_NAME,
  },
};

export default function DefaultNotFound() {
  return (
    <div
      className={css({
        bgColor: 'background.main',
        minH: '100vh',
      })}
    >
      <Header />
      <div className={css({ p: 2, maxW: '800px', mx: 'auto' })}>
        <main className={css({ my: 4 })}>
          <NotFound />
        </main>
        <Footer />
      </div>
    </div>
  );
}
