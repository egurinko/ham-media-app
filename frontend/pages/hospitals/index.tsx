import { Box } from '@chakra-ui/react';
import { Layout } from '@/components/layouts/consumer/Layout';
import { Head } from '@/components/molecules/Head';
import { HospitalSearch } from '@/components/organisms/consumer/hospitals/index/HospitalSearch';
import { NightServiceHospitals } from '@/components/organisms/consumer/hospitals/index/NightServiceHospitals';
import { RecommendedHospitals } from '@/components/organisms/consumer/hospitals/index/RecommendedHospitals';
import { TitleSection } from '@/components/organisms/consumer/hospitals/index/TitleSection';
import { getHospitalConnection } from '@/services/api/public_api/getHospitalConnection';
import type { GetStaticProps } from 'next';
import type {
  PublicGetHospitalConnectionQuery,
  PublicGetHospitalConnectionQueryVariables,
} from '@/services/api/public_api/types';
import type { ReactElement } from 'react';
import { apiClient } from '@/utils/apollo';
import { SERVICE_NAME, ORIGIN_URL } from '@/utils/constant';
import { HOSPITALS_PATH } from '@/utils/routes';

const Index = ({
  nightServiceHospitalConnection,
  recommendedHospitalConnection,
}: Props) => (
  <>
    <Head
      title={`ハムスター受付病院検索 | ${SERVICE_NAME}`}
      description={`${SERVICE_NAME}が厳選したハムスター受付病院の検索。場所のキーワードや現在地を利用してお近くのハムスター受付病院を検索できます。また、詳細検索により予約形態/夜間営業/保険適用状態などを指定して病院を絞り込めます。`}
      ogpUrl={`${ORIGIN_URL}${HOSPITALS_PATH}`}
      keywords={`ハムスター受付病院,動物病院,ハムスター,ハムメディア,${SERVICE_NAME}`}
    />
    <TitleSection />

    <Box my="4">
      <HospitalSearch />
    </Box>
    <Box my="4">
      <RecommendedHospitals
        recommendedHospitalConnection={recommendedHospitalConnection}
      />
    </Box>
    <Box my="4">
      <NightServiceHospitals
        nightServiceHospitalConnection={nightServiceHospitalConnection}
      />
    </Box>
  </>
);

Index.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

interface Props {
  recommendedHospitalConnection: PublicGetHospitalConnectionQuery['publicHospitalConnection'];
  nightServiceHospitalConnection: PublicGetHospitalConnectionQuery['publicHospitalConnection'];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const { data: recommendedHospitalData } = await apiClient.query<
      PublicGetHospitalConnectionQuery,
      PublicGetHospitalConnectionQueryVariables
    >({
      query: getHospitalConnection,
      variables: {
        first: 100,
        searchText: '',
        reservable: false,
        nightServiceOption: false,
        insuranceEnabled: false,
        jsavaOption: false,
        nichijuOption: false,
        recommended: true,
      },
      fetchPolicy: 'network-only',
    });

    const { data: nightServiceHospitalData } = await apiClient.query<
      PublicGetHospitalConnectionQuery,
      PublicGetHospitalConnectionQueryVariables
    >({
      query: getHospitalConnection,
      variables: {
        first: 100,
        searchText: '',
        reservable: false,
        nightServiceOption: true,
        insuranceEnabled: false,
        jsavaOption: false,
        nichijuOption: false,
        recommended: false,
      },
      fetchPolicy: 'network-only',
    });

    return {
      props: {
        recommendedHospitalConnection:
          recommendedHospitalData.publicHospitalConnection,
        nightServiceHospitalConnection:
          nightServiceHospitalData.publicHospitalConnection,
      },
      revalidate: 600,
    };
  } catch {}

  return {
    props: {
      recommendedHospitalConnection: null,
      nightServiceHospitalConnection: null,
    },
    revalidate: 600,
  };
};

export default Index;
