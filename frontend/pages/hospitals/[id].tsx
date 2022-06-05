import { ChevronRightIcon } from '@chakra-ui/icons';
import { Heading, Box, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { getHospital } from '@/api/public_api/getHospital';
import { getHospitalIds } from '@/api/public_api/getHospitalIds';
import type {
  PublicGetHospitalIdsQuery,
  PublicGetHospitalQuery,
  PublicGetHospitalQueryVariables,
} from '@/api/public_api/types';
import { Layout } from '@/components/layouts/consumer/Layout';
import { Head } from '@/components/molecules/Head';
import { DetailCard } from '@/components/organisms/consumer/hospitals/detail/DetailCard';
import { apiClient } from '@/utils/apollo';
import { SERVICE_NAME, ORIGIN_URL } from '@/utils/constant';
import { HOSPITALS_DETAIL_PATH, goHospitalsResult } from '@/utils/routes';
import type { GetStaticPaths, GetStaticProps } from 'next';
import type { ParsedUrlQuery } from 'querystring';
import type { ReactElement } from 'react';

const Show = ({ hospital }: Props) => {
  const router = useRouter();

  return (
    <>
      <Head
        title={`${hospital.name} - ${SERVICE_NAME}：ハムスター受付病院検索`}
        description={`【${SERVICE_NAME}公式病院検索】${hospital.name}（${hospital.hospitalAddress?.prefecture.name}${hospital.hospitalAddress?.address}）の診療時間や予約情報などを確認できます。${SERVICE_NAME}が厳選したハムスター受付病院になります。`}
        ogpUrl={`${ORIGIN_URL}${HOSPITALS_DETAIL_PATH(hospital.id)}`}
        keywords={`${hospital.name},${hospital.hospitalAddress?.prefecture.name},ハムスター受付病院,動物病院,ハムスター,ハムメディア,${SERVICE_NAME}`}
      />
      <Box display="flex" mb="4" mt="2">
        <Button
          aria-label="link"
          variant="link"
          onClick={() => goHospitalsResult(router)}
          leftIcon={<ChevronRightIcon />}
        >
          <Heading size="sm">検索結果に戻る</Heading>
        </Button>
      </Box>
      <Box>
        <DetailCard hospital={hospital} />
      </Box>
    </>
  );
};

Show.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

interface Params extends ParsedUrlQuery {
  id: string;
}

interface Props {
  hospital: PublicGetHospitalQuery['hospital'];
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  try {
    const { data } = await apiClient.query<PublicGetHospitalIdsQuery>({
      query: getHospitalIds,
    });

    const paths = data.hospitals
      .map((hospital) => ({
        params: { id: String(hospital.id) },
      }))
      .slice(0, 300);

    return { paths, fallback: 'blocking' };
  } catch (e) {
    console.log({ e });
  }

  return { paths: [], fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  if (params) {
    try {
      const { data } = await apiClient.query<
        PublicGetHospitalQuery,
        PublicGetHospitalQueryVariables
      >({
        query: getHospital,
        variables: {
          id: BigInt(params.id),
        },
        fetchPolicy: 'network-only',
      });
      return { props: { hospital: data.hospital }, revalidate: 60 };
    } catch {}
  }

  return { notFound: true };
};

export default Show;
