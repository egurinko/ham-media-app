import { Suspense } from 'react';
import { Card } from '@/app/components/atoms/Card';
import { Hero } from '@/app/components/organisms/consumer/hospitals/Hero';
import { LocationSearch } from '@/app/components/organisms/consumer/hospitals/LocationSearch';
import { NightServiceHospitals } from '@/app/components/organisms/consumer/hospitals/NightServiceHospitals';
import { RecommendedHospitals } from '@/app/components/organisms/consumer/hospitals/RecommendedHospitals';
import { TextSearch } from '@/app/components/organisms/consumer/hospitals/TextSearch';
import {
  SERVICE_NAME,
  OG_DEFAULT_IMAGE,
  ORIGIN_URL,
} from '@/app/utils/constant';
import { css } from '@/styled/css';
import { HOSPITALS_PATH } from '@/utils/routes';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `ハムスター受付病院検索 | ${SERVICE_NAME}`,
  description: `${SERVICE_NAME}が厳選したハムスター受付病院の検索。場所のキーワードや現在地を利用してお近くのハムスター受付病院を検索できます。また、詳細検索により予約形態/夜間営業/保険適用状態などを指定して病院を絞り込めます。`,
  openGraph: {
    type: 'website',
    url: `${ORIGIN_URL}${HOSPITALS_PATH}`,
    title: `ハムスター受付病院検索 | ${SERVICE_NAME}`,
    description: `${SERVICE_NAME}が厳選したハムスター受付病院の検索。場所のキーワードや現在地を利用してお近くのハムスター受付病院を検索できます。また、詳細検索により予約形態/夜間営業/保険適用状態などを指定して病院を絞り込めます。`,
    siteName: SERVICE_NAME,
    images: OG_DEFAULT_IMAGE,
  },
};

export default async function Page() {
  return (
    <div
      className={css({
        display: 'flex',
        flexDir: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 'md',
      })}
    >
      <Hero />
      <Card
        className={css({
          width: '100%',
          p: 'lg',
        })}
      >
        <Suspense>
          <TextSearch />
        </Suspense>
        <div
          className={css({
            mt: 4,
          })}
        >
          <Suspense>
            <LocationSearch />
          </Suspense>
        </div>
      </Card>
      <RecommendedHospitals />
      <NightServiceHospitals />
    </div>
  );
}
