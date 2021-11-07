import {
  Text,
  Box,
  VStack,
  Divider,
  Badge,
  Input,
  Switch,
  Select,
  Button,
  Spinner,
} from '@chakra-ui/react';
import { useCallback, useRef, Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useInternalGetHospitalConnectionLazyQuery } from '@/api/internal_api/types';
import { usePublicGetPrefecturesQuery } from '@/api/public_api/types';
import { useIntersectionObserver } from '@/utils/hooks/useIntersectionObserver';
import { MapPinIcon } from '@/components/atoms/assets/MapPinIcon';
import { PhoneIcon } from '@/components/atoms/assets/PhoneIcon';

const HospitalsSearch: React.VFC<NoProps> = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [deleted, setDeleted] = useState(false);
  const [prefectureId, setPrefectureId] = useState('');
  const { data: prefectures } = usePublicGetPrefecturesQuery();
  const infiniteScrollTarget = useRef<HTMLDivElement>(null);
  const { isIntersect } = useIntersectionObserver(infiniteScrollTarget);

  const [getHospitals, { data, loading, error, fetchMore }] =
    useInternalGetHospitalConnectionLazyQuery();

  const nodes = data?.hospitalConnection?.edges?.map((edge) => edge?.node);
  const pageInfo = data?.hospitalConnection?.pageInfo;

  const handleClick = useCallback(
    (id: BigInt) => {
      router.push(`/admin/hospitals/${id}/edit`);
    },
    [router]
  );

  const searchHospitals = useCallback(() => {
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            searchHospitals();
          }}
        >
          <Box display="flex">
            <Box mr="4">
              <Text>病院名 (前方一致)</Text>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </Box>
            <Box mr="4">
              <Text>都道府県</Text>
              <Select
                placeholder="選択してください"
                value={prefectureId}
                onChange={(e) => setPrefectureId(e.target.value)}
              >
                {prefectures?.prefectures.map((prefecture) => (
                  <option
                    key={String(prefecture.id)}
                    value={String(prefecture.id)}
                  >
                    {prefecture.name}
                  </option>
                ))}
              </Select>
            </Box>
            <Box mr="4">
              <Text>公開状態</Text>
              <Switch
                defaultChecked={!deleted}
                checked={!deleted}
                onChange={(e) => setDeleted(!e.target.checked)}
              />
            </Box>
          </Box>
          <Box textAlign="center">
            <Button
              mt="4"
              variant="solid"
              bgColor="primary.main"
              color="white"
              isLoading={loading}
              type="submit"
            >
              検索
            </Button>
          </Box>
        </form>
      </Box>
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
                    <Text fontSize={{ sm: 'xl', md: '2xl' }} fontWeight="bold">
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
                      <MapPinIcon width={15} height={15} />
                    </Box>
                    <Text fontSize="sm">
                      {node.hospitalAddress?.prefecture.name}
                      {node.hospitalAddress?.address}
                    </Text>
                  </Box>
                  <Box flexShrink={0} display="flex" alignItems="center">
                    <Box fill="primary.main" mr="1">
                      <PhoneIcon width={15} height={15} />
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
      </VStack>
      <Box w="2" h="2" ref={infiniteScrollTarget} id="target" />
      <Box textAlign="center">
        {loading ? <Spinner size="lg" color="main.primary" /> : null}
      </Box>
    </>
  );
};

export { HospitalsSearch };
