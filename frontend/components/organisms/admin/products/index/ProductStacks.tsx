import { useEffect, useRef } from 'react';
import {
  Text,
  Skeleton,
  Box,
  VStack,
  Divider,
  Spinner,
  Tag,
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
                  <Box flexShrink="0" mr="1">
                    <img
                      src={product.url}
                      alt={product.name}
                      width="60"
                      height="60"
                      style={{
                        objectFit: 'contain',
                        width: '60px',
                        height: '60px',
                      }}
                    />
                  </Box>
                  <Box flexShrink="1">
                    <Text fontSize="xs">{product.maker.name}</Text>
                    <Text fontSize="sm" mb="2" fontWeight="bold">
                      {product.name}
                    </Text>
                    {product.productTaggings.map((productTagging) => (
                      <Tag
                        key={productTagging.id}
                        bgColor="primary.main"
                        color="white"
                        fontSize="xs"
                        mr="1"
                        mb="1"
                      >
                        {productTagging.productTag.name}
                      </Tag>
                    ))}
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
