import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { Heading, Box, Button } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import Layout from '@/components/layouts/consumer/Layout';
import HospitalDetail from '@/components/organisms/consumer/hospitals/HospitalDetail';
import type {
  PublicGetHospitalIdsQuery,
  PublicGetHospitalQuery,
  PublicGetHospitalQueryVariables,
} from '@/api/public_api/types';
import { getHospitalIds } from '@/api/public_api/getHospitalIds';
import { getHospital } from '@/api/public_api/getHospital';
import { apiClient } from '@/utils/apollo';
import { goHospitals } from '@/utils/routes';

const Show: React.VFC<Props> = ({ hospital }) => {
  const router = useRouter();

  return (
    <Layout title={`${hospital.name} - Ham ω Media`}>
      <Box d="flex" mb="4" mt="2">
        <Button
          aria-label="link"
          variant="link"
          onClick={() => goHospitals(router)}
          leftIcon={<ChevronRightIcon />}
        >
          <Heading size="sm">他の病院を探す</Heading>
        </Button>
      </Box>
      <Box>
        <HospitalDetail hospital={hospital} />
      </Box>
    </Layout>
  );
};

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

    const paths = data.hospitals.map((hospital) => ({
      params: { id: String(hospital.id) },
    }));

    return { paths, fallback: false };
  } catch (e) {
    console.log({ e });
  }

  return { paths: [], fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const { data } = await apiClient.query<
    PublicGetHospitalQuery,
    PublicGetHospitalQueryVariables
  >({
    query: getHospital,
    variables: {
      id: BigInt(params!.id),
    },
  });

  return { props: { hospital: data.hospital, revalidate: 300 } };
};

export default Show;
