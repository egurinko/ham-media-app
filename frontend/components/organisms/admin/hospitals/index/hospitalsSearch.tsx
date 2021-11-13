import { Text, Box, Spinner } from '@chakra-ui/react';
import { useCallback, useRef, useEffect, useState } from 'react';
import { useInternalGetHospitalConnectionLazyQuery } from '@/api/internal_api/types';
import type { Hospital } from '@/api/internal_api/types';
import { useIntersectionObserver } from '@/utils/hooks/useIntersectionObserver';
import { SearchSection } from './hospitalsSearch/SearchSection';
import { HospitalsStack } from './hospitalsSearch/HospitalsStack';
import type { SearchHospitals } from './types';

const HospitalsSearch: React.VFC<NoProps> = () => {
  const [name, setName] = useState('');
  const [deleted, setDeleted] = useState(false);
  const [prefectureId, setPrefectureId] = useState('');
  const infiniteScrollTarget = useRef<HTMLDivElement>(null);
  const { isIntersect } = useIntersectionObserver(infiniteScrollTarget);

  const [getHospitals, { data, loading, error, fetchMore }] =
    useInternalGetHospitalConnectionLazyQuery();

  const nodes = data?.hospitalConnection?.edges
    ?.map((edge) => edge?.node)
    .filter((node): node is Hospital => !!node);
  const pageInfo = data?.hospitalConnection?.pageInfo;

  const searchHospitals: SearchHospitals = useCallback(() => {
    if (fetchMore) {
      fetchMore({
        variables: {
          first: 10,
          name,
          deleted,
          prefectureId: prefectureId !== '' ? BigInt(prefectureId) : undefined,
        },
      });
    }
  }, [getHospitals, name, deleted, prefectureId]);

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
            },
          });
        }
      } else {
        getHospitals({
          variables: { first: 10 },
        });
      }
    }
  }, [isIntersect, fetchMore, pageInfo?.hasNextPage, pageInfo?.endCursor]);

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
          loading={loading}
          searchHospitals={searchHospitals}
        />
      </Box>
      <HospitalsStack hospitals={nodes} />
      <Box w="2" h="2" ref={infiniteScrollTarget} id="target" />
      <Box textAlign="center">
        {loading ? <Spinner size="lg" color="main.primary" /> : null}
      </Box>
    </>
  );
};

export { HospitalsSearch };
