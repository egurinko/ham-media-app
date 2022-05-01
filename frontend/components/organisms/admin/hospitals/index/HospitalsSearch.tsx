import { Text, Box } from '@chakra-ui/react';
import { useCallback, useRef, useEffect, useState } from 'react';
import { useInternalGetHospitalConnectionQuery } from '@/api/internal_api/types';
import type { Hospital } from '@/api/internal_api/types';
import { Spinner } from '@/components/atoms/Spinner';
import { useIntersectionObserver } from '@/utils/hooks/useIntersectionObserver';
import { HospitalsStack } from './hospitalsSearch/HospitalsStack';
import { SearchSection } from './hospitalsSearch/SearchSection';
import type { SearchHospitals } from './types';

const HospitalsSearch: React.VFC<NoProps> = () => {
  const [name, setName] = useState('');
  const [deleted, setDeleted] = useState(false);
  const [prefectureId, setPrefectureId] = useState('');
  const [internalReputationStar, setInternalReputationStar] = useState('');
  const infiniteScrollTarget = useRef<HTMLDivElement>(null);
  const { isIntersect } = useIntersectionObserver(infiniteScrollTarget);

  const { data, loading, error, fetchMore } =
    useInternalGetHospitalConnectionQuery({
      variables: { first: 10, deleted },
      fetchPolicy: 'network-only',
    });

  const nodes = data?.hospitalConnection?.edges
    ?.map((edge) => edge?.node)
    .filter((node): node is Hospital => !!node);
  const pageInfo = data?.hospitalConnection?.pageInfo;

  const searchHospitals: SearchHospitals = useCallback(async () => {
    if (fetchMore) {
      await fetchMore({
        variables: {
          first: 10,
          name,
          deleted,
          prefectureId: prefectureId !== '' ? BigInt(prefectureId) : undefined,
          internalReputationStar:
            internalReputationStar !== ''
              ? Number(internalReputationStar)
              : undefined,
        },
      });
    }
  }, [name, deleted, prefectureId, internalReputationStar, fetchMore]);

  useEffect(() => {
    if (isIntersect) {
      if (fetchMore) {
        if (pageInfo?.hasNextPage) {
          fetchMore({
            variables: {
              first: 10,
              after: pageInfo?.endCursor,
              name,
              deleted,
              prefectureId:
                prefectureId !== '' ? BigInt(prefectureId) : undefined,
              internalReputationStar:
                internalReputationStar !== ''
                  ? Number(internalReputationStar)
                  : undefined,
            },
          });
        }
      }
    }
  }, [
    isIntersect,
    fetchMore,
    pageInfo?.hasNextPage,
    pageInfo?.endCursor,
    deleted,
    name,
    prefectureId,
    internalReputationStar,
  ]);

  if (error) return <Text>エラーです</Text>;

  return (
    <>
      <Box bg="white" p="4" my="4">
        <SearchSection
          name={name}
          setName={setName}
          deleted={deleted}
          setDeleted={setDeleted}
          prefectureId={prefectureId}
          setPrefectureId={setPrefectureId}
          internalReputationStar={internalReputationStar}
          setInternalReputationStar={setInternalReputationStar}
          loading={loading}
          searchHospitals={searchHospitals}
        />
      </Box>
      <HospitalsStack hospitals={nodes} />
      <Box w="2" h="2" ref={infiniteScrollTarget} id="target" />
      <Box textAlign="center">
        <Spinner loading={loading} />
      </Box>
    </>
  );
};

export { HospitalsSearch };
