import { getHospital } from '@/services/api/public_api/getHospital';
import { getHospitalIds } from '@/services/api/public_api/getHospitalIds';
import type {
  PublicGetHospitalIdsQuery,
  PublicGetHospitalQuery,
  PublicGetHospitalQueryVariables,
} from '@/services/api/public_api/types';
import { getPublicClient } from '@/utils/client';
import { SERVICE_NAME, OG_DEFAULT_IMAGE } from '@/utils/constant';
import { HOSPITALS_DETAIL_PATH } from '@/utils/routes';
import Show from './show-page';
import type { Metadata } from 'next';

type Props = {
  params: Params;
};

type Params = {
  id: string;
};

export const dynamicParams = true;
export async function generateStaticParams(): Promise<Params[]> {
  const { data } = await getPublicClient().query<PublicGetHospitalIdsQuery>({
    query: getHospitalIds,
  });

  return data.hospitals.map((h) => ({ id: String(h.id) }));
}

async function generateHospital(params: Params) {
  const { data } = await getPublicClient().query<
    PublicGetHospitalQuery,
    PublicGetHospitalQueryVariables
  >({
    query: getHospital,
    variables: { id: Number(params.id) },
    context: {
      fetchOptions: {
        next: { revalidate: 60 },
      },
    },
  });

  return data.hospital;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const hospital = await generateHospital(params);
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
}

export default async function Page({ params }: Props) {
  const hospital = await generateHospital(params);

  return <Show hospital={hospital} />;
}
