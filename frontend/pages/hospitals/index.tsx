import { Box } from '@chakra-ui/react';
import { Layout } from '@/components/layouts/consumer/Layout';
import { Head } from '@/components/molecules/Head';
import { ClientOnly } from '@/components/organisms/ClientOnly';
import { HospitalSearch } from '@/components/organisms/consumer/hospitals/index/HospitalSearch';
import { NightServiceHospitals } from '@/components/organisms/consumer/hospitals/index/NightServiceHospitals';
import { RecommendedHospitals } from '@/components/organisms/consumer/hospitals/index/RecommendedHospitals';
import { TitleSection } from '@/components/organisms/consumer/hospitals/index/TitleSection';
import { SERVICE_NAME, ORIGIN_URL } from '@/utils/constant';
import { HOSPITALS_PATH } from '@/utils/routes';
import type { ReactElement } from 'react';

const Index = () => (
  <>
    <Head
      title={`ハムスター受付病院検索 | ${SERVICE_NAME}`}
      description={`${SERVICE_NAME}が厳選したハムスター受付病院の検索。場所のキーワードや現在地を利用してお近くのハムスター受付病院を検索できます。また、詳細検索により予約形態/夜間営業/保険適用状態などを指定して病院を絞り込めます。`}
      ogpUrl={`${ORIGIN_URL}${HOSPITALS_PATH}`}
      keywords={`ハムスター受付病院,動物病院,ハムスター,ハムメディア,${SERVICE_NAME}`}
    />
    <TitleSection />
    <ClientOnly>
      <Box my="4">
        <HospitalSearch />
      </Box>
      <Box my="4">
        <RecommendedHospitals />
      </Box>
      <Box my="4">
        <NightServiceHospitals />
      </Box>
    </ClientOnly>
  </>
);

Index.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Index;
