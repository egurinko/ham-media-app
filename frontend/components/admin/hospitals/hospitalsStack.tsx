import { Text, Skeleton, Box, VStack, Divider, Badge } from '@chakra-ui/react';
import { useCallback, useRef, Fragment, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useInternalGetHospitalConnectionQuery } from '@/api/internal_api/types';
import { useIntersectionObserver } from '@/utils/hooks/useIntersectionObserver';
import MapPin from '../../../assets/map_pin.svg';
import Phone from '../../../assets/phone.svg';

const HospitalsStack: React.VFC<Record<string, never>> = () => {
  const { data, loading, error, fetchMore } =
    useInternalGetHospitalConnectionQuery({
      variables: { first: 10 },
    });
  const nodes = data?.hospitalConnection?.edges?.map((edge) => edge?.node);
  const pageInfo = data?.hospitalConnection?.pageInfo;
  const router = useRouter();

  const handleClick = useCallback(
    (id: BigInt) => {
      router.push(`/admin/hospitals/${id}/edit`);
    },
    [router]
  );

  const infiniteScrollTarget = useRef<HTMLDivElement>(null);
  const { startObserving, isIntersect } =
    useIntersectionObserver(infiniteScrollTarget);

  useEffect(() => {
    startObserving(true);
  }, [startObserving]);

  useEffect(() => {
    if (isIntersect) {
      if (pageInfo?.hasNextPage) {
        fetchMore({
          variables: {
            first: 10,
            after: pageInfo?.endCursor,
          },
        });
      }
    }
  }, [isIntersect, fetchMore, pageInfo?.hasNextPage, pageInfo?.endCursor]);

  useEffect(() => {
    console.log({ loading });
  }, [loading]);

  if (error) return <Text>エラーです</Text>;

  return (
    <>
      <Skeleton isLoaded={!loading}>
        <VStack spacing="0" mt="4" alignItems="flex-start">
          <Divider />
          {nodes?.map((node) => {
            return node ? (
              <Fragment key={node.name}>
                <Box
                  w="100%"
                  display="flex"
                  flexDirection="column"
                  alignItems="flex-start"
                  _hover={{
                    background: 'background.hover',
                    color: 'primary.main',
                    cursor: 'pointer',
                  }}
                  p="2"
                  onClick={() => handleClick(node.id)}
                >
                  <Box w="full">
                    <Box
                      display="flex"
                      flexDirection="row"
                      justifyContent="space-between"
                      alignItems="center"
                      pb="2"
                    >
                      <Text
                        fontSize={{ sm: 'xl', md: '2xl' }}
                        fontWeight="bold"
                      >
                        {node.name}
                      </Text>
                      <div>
                        {node.deleted ? (
                          <Badge colorScheme="red">非公開</Badge>
                        ) : (
                          <Badge colorScheme="green">公開</Badge>
                        )}
                      </div>
                    </Box>
                  </Box>
                  <Box flexShrink={0}>
                    <Box flexShrink={0} display="flex" alignItems="center">
                      <Box fill="primary.main" mr="1">
                        <MapPin width={15} height={15} />
                      </Box>
                      <Text fontSize="sm">
                        {node.hospitalAddress?.prefecture.name}
                        {node.hospitalAddress?.address}
                      </Text>
                    </Box>
                    <Box flexShrink={0} display="flex" alignItems="center">
                      <Box fill="primary.main" mr="1">
                        <Phone width={15} height={15} />
                      </Box>
                      <Text fontSize="sm">
                        {node.hospitalAddress?.phone_number}
                      </Text>
                    </Box>
                  </Box>
                </Box>
                <Divider />
              </Fragment>
            ) : null;
          })}
          <div ref={infiniteScrollTarget} />
        </VStack>
      </Skeleton>
    </>
  );
};

export default HospitalsStack;
