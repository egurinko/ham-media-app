import { Suspense } from 'react';
import { Breadcrumbs } from '@/app/(consumer)/hospitals/result/breadcrumbs';
import { Filter } from '@/app/(consumer)/hospitals/result/filter';
import { HospitalSkeletons } from '@/app/(consumer)/hospitals/result/hospital-skeletons';
import { Hospitals } from '@/app/(consumer)/hospitals/result/hospitals';
import { TextSearch } from '@/app/(consumer)/hospitals/result/text-search';
import {
  SERVICE_NAME,
  OG_DEFAULT_IMAGE,
  ORIGIN_URL,
} from '@/app/utils/constant';
import { css } from '@/styled/css';
import { HOSPITALS_RESULT_PATH } from '@/utils/routes';
import type { Metadata } from 'next';

type Props = {
  params: Params;
  searchParams: SearchParams;
};

type Params = NoProps;

type SearchParams = {
  searchText?: string;
  latitude?: string;
  longitude?: string;
  nightServiceOption?: string;
  recommended?: string;
  reservable?: string;
  insuranceEnabled?: string;
  jsavaOption?: string;
  nichijuOption?: string;
};
export const metadata: Metadata = {
  title: `ハムスター受付病院検索 | ${SERVICE_NAME}`,
  description: `${SERVICE_NAME}が厳選したハムスター受付病院の検索結果。詳細な検索を利用し予約形態/夜間営業可否/保険適用可否/各種資格取得状態などを指定して病院を絞り込めます。`,
  openGraph: {
    type: 'website',
    url: `${ORIGIN_URL}${HOSPITALS_RESULT_PATH}`,
    title: `ハムスター受付病院検索 | ${SERVICE_NAME}`,
    description: `${SERVICE_NAME}が厳選したハムスター受付病院の検索結果。詳細な検索を利用し予約形態/夜間営業可否/保険適用可否/各種資格取得状態などを指定して病院を絞り込めます。`,
    siteName: SERVICE_NAME,
    images: OG_DEFAULT_IMAGE,
  },
};

export default async function Page({ searchParams }: Props) {
  const searchText = searchParams.searchText || '';
  const latitude = Number(searchParams.latitude);
  const longitude = Number(searchParams.longitude);
  const nightServiceOption = searchParams.nightServiceOption === 'true';
  const reservable = searchParams.reservable === 'true';
  const insuranceEnabled = searchParams.insuranceEnabled === 'true';
  const jsavaOption = searchParams.jsavaOption === 'true';
  const nichijuOption = searchParams.nichijuOption === 'true';
  const recommended = searchParams.recommended === 'true';

  return (
    <div
      className={css({
        display: 'flex',
        flexDir: 'column',
        alignItems: 'flex-start',
        gap: 'md',
      })}
    >
      <Breadcrumbs />
      <TextSearch />
      <Suspense fallback={<HospitalSkeletons />}>
        <Hospitals
          searchText={searchText}
          latitude={latitude}
          longitude={longitude}
          nightServiceOption={nightServiceOption}
          reservable={reservable}
          insuranceEnabled={insuranceEnabled}
          jsavaOption={jsavaOption}
          nichijuOption={nichijuOption}
          recommended={recommended}
        />
      </Suspense>
      <Filter />
    </div>
  );
}
