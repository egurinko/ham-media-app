import { useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  Text,
  Skeleton,
  Box,
  VStack,
  Divider,
  Spinner,
} from '@chakra-ui/react';
import { useCallback, Fragment } from 'react';
import { useRouter } from 'next/router';
import { useInternalGetProductConnectionQuery } from '@/api/internal_api/types';
import type { Product } from '@/api/internal_api/types';
import { FlashMessage } from '@/components/molecules/FlashMessage';
import { goAdminProductsEdit } from '@/utils/routes';
import { useIntersectionObserver } from '@/utils/hooks/useIntersectionObserver';

const ProductStacks: React.VFC<NoProps> = () => {
  const router = useRouter();
  const infiniteScrollTarget = useRef<HTMLDivElement>(null);
  const { isIntersect } = useIntersectionObserver(infiniteScrollTarget);

  const { data, loading, error, fetchMore } =
    useInternalGetProductConnectionQuery({
      variables: { first: 10 },
      fetchPolicy: 'network-only',
    });
  const nodes = data?.productConnection?.edges
    ?.map((edge) => edge?.node)
    .filter((node): node is Product => !!node);
  const pageInfo = data?.productConnection?.pageInfo;

  useEffect(() => {
    if (isIntersect && pageInfo?.hasNextPage && !loading) {
      fetchMore({ variables: { first: 10, after: pageInfo?.endCursor } });
    }
  }, [isIntersect, pageInfo, loading, fetchMore]);

  const handleProductClick = useCallback(
    (id: number) => {
      goAdminProductsEdit(router, { id });
    },
    [router]
  );

  return (
    <>
      <Skeleton isLoaded={!loading}>
        <VStack spacing="0" mt="4" alignItems="flex-start">
          {error ? (
            <FlashMessage message="エラーが発生しました。" status="error" />
          ) : null}
          <Divider />
          {nodes?.map((product) => (
            <Fragment key={product.id}>
              <Box
                w="100%"
                display="flex"
                flexDirection="row"
                alignItems="center"
                _hover={{
                  background: 'background.hover',
                  color: 'primary.main',
                  cursor: 'pointer',
                }}
                p="2"
                onClick={() => handleProductClick(product.id)}
              >
                <Box flex="1" display="flex" flexDir="row" alignItems="center">
                  <Box flexShrink="0" w="16" h="16" objectFit="contain" mr="1">
                    <img src={product.url} alt={product.name} />
                  </Box>
                  <Box flexShrink="1">
                    <Text fontSize="xs">{product.maker.name}</Text>
                    <Text fontSize="sm" fontWeight="bold">
                      {product.name}
                    </Text>
                  </Box>
                </Box>
                <Box ml="2">
                  <Text fontSize="sm">在庫：{product.stocks.length}</Text>
                </Box>
              </Box>
              <Divider />
            </Fragment>
          ))}
        </VStack>
      </Skeleton>
      {loading ? <Spinner /> : null}
      <Box w="2" h="2" ref={infiniteScrollTarget} id="target" />
    </>
  );
};

export { ProductStacks };
