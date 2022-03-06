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
import { DetailCard } from '@/components/organisms/consumer/hospitals/detail/DetailCard';
import { apiClient } from '@/utils/apollo';
import { goHospitals } from '@/utils/routes';
import type { GetStaticPaths, GetStaticProps } from 'next';
import type { ParsedUrlQuery } from 'querystring';

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
        <DetailCard hospital={hospital} />
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
        fetchPolicy: 'no-cache',
      });
      return { props: { hospital: data.hospital }, revalidate: 60 };
    } catch {}
  }

  return { notFound: true };
};

export default Show;
