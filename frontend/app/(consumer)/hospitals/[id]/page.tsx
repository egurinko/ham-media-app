import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { getHospital } from '@/app/utils/api/publicApi/getHospital';
import { getHospitalIds } from '@/app/utils/api/publicApi/getHospitalIds';
import { css } from '@/styled/css';
import { SERVICE_NAME, OG_DEFAULT_IMAGE } from '@/utils/constant';
import { HOSPITALS_DETAIL_PATH } from '@/utils/routes';
import { Breadcrumbs } from './Breadcrumbs';
import { DetailCard } from './DetailCard';
import { HospitalMapCard } from './HospitalMapCard';
import type { Metadata } from 'next';

type Props = {
  params: Params;
};

type Params = Promise<{
  id: string;
}>;

export const dynamicParams = true;
export async function generateStaticParams() {
  const { data } = await getHospitalIds();

  return data.hospitals.map((hospital) => ({ id: String(hospital.id) }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  try {
    const { data } = await getHospital(params.id);
    const { hospital } = data;
    const title = `${hospital.name} - ${SERVICE_NAME}：ハムスター受付病院検索`;
    const description = `【${SERVICE_NAME}公式病院検索】${hospital.name}（${hospital.hospitalAddress?.prefecture.name}${hospital.hospitalAddress?.address}）の診療時間や予約情報などを確認できます。${SERVICE_NAME}が厳選したハムスター受付病院になります。`;

    return {
      title,
      description,
      keywords: [
        hospital.name,
        hospital.hospitalAddress?.prefecture.name || '',
        'ハムスター受付病院',
        '動物病院',
        'ハムスター',
        'ハムメディア',
        SERVICE_NAME,
      ],
      openGraph: {
        type: 'website',
        url: `${HOSPITALS_DETAIL_PATH(hospital.id)}`,
        title,
        description,
        siteName: SERVICE_NAME,
        images: OG_DEFAULT_IMAGE,
      },
    };
  } catch (e) {
    console.log({ e });
    notFound();
  }
}

export default async function Page(props: Props) {
  const params = await props.params;
  return (
    <div className={css({ display: 'flex', flexDir: 'column', gap: '4' })}>
      <Suspense fallback={<div>loading...</div>}>
        <Breadcrumbs hospitalId={params.id} />
      </Suspense>
      <Suspense fallback={<div>loading detail...</div>}>
        <DetailCard hospitalId={params.id} />
      </Suspense>
      <Suspense fallback={<div>loading map...</div>}>
        <HospitalMapCard hospitalId={params.id} />
      </Suspense>
    </div>
  );
}
