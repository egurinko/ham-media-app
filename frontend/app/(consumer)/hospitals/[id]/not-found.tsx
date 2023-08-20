import Image from 'next/image';
import { Typography } from '@/app/components/atoms/Typography';
import { css } from '@/styled/css';
import { SERVICE_NAME, ORIGIN_URL } from '@/utils/constant';
import { NOTFOUND_PATH } from '@/utils/routes';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `お探しのページが見つかりませんでした - ${SERVICE_NAME}`,
  icons: '/favicon.png',
  keywords: [
    'NotFound',
    'ハムスター受付病院',
    '動物病院',
    'ハムスター',
    'ハムメディア',
    SERVICE_NAME,
  ],
  openGraph: {
    type: 'website',
    url: `${ORIGIN_URL}${NOTFOUND_PATH}`,
    title: `お探しのページが見つかりませんでした - ${SERVICE_NAME}`,
    siteName: SERVICE_NAME,
  },
};

export default function NotFound() {
  return (
    <div
      className={css({
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignContent: 'center',
        my: { base: 16, md: 32 },
      })}
    >
      <div className={css({ textAlign: 'center' })}>
        <Typography
          variant="headlineL"
          className={css({ color: 'primary.main', mb: '4' })}
        >
          404
        </Typography>
        <Typography
          variant="headlineS"
          bold={true}
          className={css({ mb: '2' })}
        >
          お探しのページが見つかりません
        </Typography>
        <Typography variant="body2">
          URLに誤りがあるか、ページが移動または削除された可能性がございます。
        </Typography>
      </div>
      <div className={css({ my: 'auto' })}>
        <Image
          src="/hamster_sleep.png"
          alt="NotFoundロゴ"
          width={300}
          height={170}
        />
      </div>
    </div>
  );
}
