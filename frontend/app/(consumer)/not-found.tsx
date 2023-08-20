import { NotFound } from '@/app/components/organisms/NotFound';
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

export default function HospitalNotFound() {
  return <NotFound />;
}
