import { getHospital } from '@/services/api/public_api/getHospital';
import { getHospitalIds } from '@/services/api/public_api/getHospitalIds';
import type {
  PublicGetHospitalIdsQuery,
  PublicGetHospitalQuery,
  PublicGetHospitalQueryVariables,
} from '@/services/api/public_api/types';
import { getPublicClient } from '@/utils/client';
import Show from './show-page';

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
    variables: { id: params.id as any },
    context: {
      fetchOptions: {
        next: { revalidate: 60 },
      },
    },
  });

  return data.hospital;
}

export default async function Page({ params }: { params: Params }) {
  const hospital = await generateHospital(params);

  return <Show hospital={hospital} />;
}
