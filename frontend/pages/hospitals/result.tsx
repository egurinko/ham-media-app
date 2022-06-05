import { ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Button, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { Layout } from '@/components/layouts/consumer/Layout';
import { Head } from '@/components/molecules/Head';
import { ClientOnly } from '@/components/organisms/ClientOnly';
import { HospitalSearch } from '@/components/organisms/consumer/hospitals/result/HospitalSearch';
import { SERVICE_NAME, ORIGIN_URL } from '@/utils/constant';
import { HOSPITALS_RESULT_PATH, goHospitals } from '@/utils/routes';
import type { ReactElement } from 'react';

const Index = () => {
  const router = useRouter();

  return (
    <>
      <Head
        title={`ハムスター受付病院検索 | ${SERVICE_NAME}`}
        description={`${SERVICE_NAME}が厳選したハムスター受付病院の検索結果。詳細な検索を利用し予約形態/夜間営業可否/保険適用可否/各種資格取得状態などを指定して病院を絞り込めます。`}
        ogpUrl={`${ORIGIN_URL}${HOSPITALS_RESULT_PATH}`}
        keywords={`ハムスター受付病院,動物病院,ハムスター,ハムメディア,${SERVICE_NAME}`}
      />
      <Box display="flex" mb="4" mt="2">
        <Button
          aria-label="link"
          variant="link"
          onClick={() => goHospitals(router)}
          leftIcon={<ChevronRightIcon />}
        >
          <Heading size="sm">病院検索トップに戻る</Heading>
        </Button>
      </Box>
      <ClientOnly>
        <HospitalSearch />
      </ClientOnly>
    </>
  );
};

Index.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Index;
