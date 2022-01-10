import React, { useEffect, useRef, useState } from 'react';
import {
  Text,
  Box,
  VStack,
  Divider,
  Spinner,
  Button,
  FormControl,
  FormLabel,
  Select,
  Badge,
} from '@chakra-ui/react';
import { useCallback, Fragment } from 'react';
import { useRouter } from 'next/router';
import { Card } from '@/components/atoms/Card';
import {
  useInternalGetStockRequestConnectionQuery,
  useInternalGetInternalUsersQuery,
} from '@/api/internal_api/types';
import type { StockRequest } from '@/api/internal_api/types';
import { FlashMessage } from '@/components/molecules/FlashMessage';
import { goAdminProductsEdit } from '@/utils/routes';
import { useIntersectionObserver } from '@/utils/hooks/useIntersectionObserver';

const StockRequestsStacks: React.VFC<NoProps> = () => {
  const router = useRouter();
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

  const handleStockRequestClick = useCallback(
    (id: number) => {
      goAdminProductsEdit(router, { id });
    },
    [router]
  );

  const handleSearch = useCallback(() => {
    if (selectedInternalUserId) {
      fetchMore({
        variables: {
          first: 10,
          internalUserId: BigInt(selectedInternalUserId),
        },
      });
    } else {
      fetchMore({ variables: { first: 10 } });
    }
  }, [fetchMore, selectedInternalUserId]);

  return (
    <>
      <Card>
        <Box display="flex" flexWrap="wrap">
          {internalUsersData ? (
            <FormControl id="allocatedInternalUser" mr="2" mb="2">
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
            onClick={handleSearch}
            mt="4"
            variant="solid"
            bgColor="primary.main"
            color="white"
          >
            検索
          </Button>
        </Box>
      </Card>

      {error ? (
        <FlashMessage message="エラーが発生しました。" status="error" />
      ) : null}
      <VStack spacing="0" mt="4" alignItems="flex-start">
        <Divider />
        {nodes?.map((stockRequest) => (
          <Fragment key={Number(stockRequest.id)}>
            <Box
              display="flex"
              alignItems="center"
              _hover={{
                background: 'background.hover',
                color: 'primary.main',
                cursor: 'pointer',
              }}
              p="2"
              onClick={() => handleStockRequestClick(stockRequest.id)}
            >
              <Box p="2">
                {stockRequest.approval ? (
                  <Badge colorScheme="green">準備中</Badge>
                ) : (
                  <Badge>承認待ち</Badge>
                )}
              </Box>
              <Box p="2">
                <Text fontSize="xs" fontWeight="bold">
                  {stockRequest.internalUser.name}
                </Text>
              </Box>
              <Box>
                {stockRequest.stockRegistrations.map((stockRegistration) => (
                  <Box
                    m="1"
                    key={stockRegistration.id}
                    display="flex"
                    alignItems="center"
                  >
                    <img
                      src={stockRegistration.stock.product.url}
                      alt={stockRegistration.stock.product.name}
                      width="25"
                      height="25"
                      style={{
                        objectFit: 'contain',
                        width: '25px',
                        height: '25px',
                      }}
                    />
                    <Text size="xs">
                      {stockRegistration.stock.product.name}
                    </Text>
                  </Box>
                ))}
              </Box>
            </Box>
            <Divider />
          </Fragment>
        ))}
      </VStack>
      {loading ? <Spinner /> : null}
      <Box w="2" h="2" ref={infiniteScrollTarget} id="target" />
    </>
  );
};

export { StockRequestsStacks };
