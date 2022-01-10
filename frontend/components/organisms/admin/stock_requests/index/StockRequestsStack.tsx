import React, { useEffect, useRef, useState, Fragment } from 'react';
import {
  Box,
  VStack,
  Divider,
  Button,
  FormControl,
  FormLabel,
  Select,
} from '@chakra-ui/react';
import { Card } from '@/components/atoms/Card';
import { Spinner } from '@/components/atoms/Spinner';
import {
  useInternalGetStockRequestConnectionQuery,
  useInternalGetInternalUsersQuery,
} from '@/api/internal_api/types';
import type { StockRequest } from '@/api/internal_api/types';
import { FlashMessage } from '@/components/molecules/FlashMessage';
import { StockRequestSummary } from './stockRequestsStack/StockRequestSummary';
import { useIntersectionObserver } from '@/utils/hooks/useIntersectionObserver';

const StockRequestsStack: React.VFC<NoProps> = () => {
  const [selectedInternalUserId, setSelectedInternalUserId] = useState<
    undefined | string
  >(undefined);

  const { data: internalUsersData } = useInternalGetInternalUsersQuery();
  const infiniteScrollTarget = useRef<HTMLDivElement>(null);
  const { isIntersect } = useIntersectionObserver(infiniteScrollTarget);

  const { data, loading, error, fetchMore } =
    useInternalGetStockRequestConnectionQuery({
      variables: { first: 10 },
      fetchPolicy: 'network-only',
    });
  const nodes = data?.stockRequestConnection?.edges
    ?.map((edge) => edge?.node)
    .filter((node): node is StockRequest => !!node);
  const pageInfo = data?.stockRequestConnection?.pageInfo;

  useEffect(() => {
    if (isIntersect && pageInfo?.hasNextPage && !loading) {
      if (selectedInternalUserId) {
        fetchMore({
          variables: {
            first: 10,
            after: pageInfo?.endCursor,
            internalUserId: BigInt(selectedInternalUserId),
          },
        });
      } else {
        fetchMore({
          variables: {
            first: 10,
            after: pageInfo?.endCursor,
          },
        });
      }
    }
  }, [isIntersect, pageInfo, loading, fetchMore, selectedInternalUserId]);

  const handleSearch = async () => {
    if (selectedInternalUserId) {
      await fetchMore({
        variables: {
          first: 10,
          internalUserId: BigInt(selectedInternalUserId),
        },
      });
    } else {
      await fetchMore({ variables: { first: 10 } });
    }
  };

  return (
    <>
      <Card>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <Box display="flex" flexWrap="wrap">
            {internalUsersData ? (
              <FormControl w="60" id="allocatedInternalUser" mr="2" mb="2">
                <FormLabel mb="1" fontSize="sm">
                  リクエストユーザ
                </FormLabel>
                <Select
                  size="sm"
                  placeholder="選択してください"
                  value={selectedInternalUserId}
                  onChange={(e) => setSelectedInternalUserId(e.target.value)}
                >
                  {internalUsersData.internalUsers.map((internalUser) => (
                    <option
                      key={Number(internalUser.id)}
                      value={Number(internalUser.id)}
                    >
                      {internalUser.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            ) : null}
          </Box>
          <Box textAlign="center">
            <Button
              type="submit"
              mt="4"
              variant="solid"
              bgColor="primary.main"
              color="white"
              isLoading={loading}
            >
              検索
            </Button>
          </Box>
        </form>
      </Card>

      {error ? (
        <FlashMessage message="エラーが発生しました。" status="error" />
      ) : null}
      <VStack spacing="0" mt="4" alignItems="flex-start">
        <Divider />
        {nodes?.map((stockRequest) => (
          <Fragment key={Number(stockRequest.id)}>
            <StockRequestSummary stockRequest={stockRequest} />
            <Divider />
          </Fragment>
        ))}
      </VStack>
      <Box textAlign="center">
        <Spinner loading={loading} />
      </Box>
      <Box w="2" h="2" ref={infiniteScrollTarget} id="target" />
    </>
  );
};

export { StockRequestsStack };
