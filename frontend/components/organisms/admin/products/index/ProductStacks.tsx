import React, { useEffect, useRef, useState, useMemo } from 'react';
import {
  Text,
  Skeleton,
  Box,
  VStack,
  Divider,
  Spinner,
  Tag,
  Button,
  Input,
  FormControl,
  FormLabel,
  Select,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react';
import { useCallback, Fragment } from 'react';
import { useRouter } from 'next/router';
import { Card } from '@/components/atoms/Card';
import {
  useInternalGetProductConnectionQuery,
  useInternalGetMakersQuery,
  useInternalGetProductTagGroupsQuery,
  useInternalGetInternalUsersQuery,
} from '@/api/internal_api/types';
import type { Product } from '@/api/internal_api/types';
import { FlashMessage } from '@/components/molecules/FlashMessage';
import { goAdminProductsEdit } from '@/utils/routes';
import { useIntersectionObserver } from '@/utils/hooks/useIntersectionObserver';

const PRODUCT_STOCK = {
  HAS: 'has',
  NOT: 'not',
  ALL: 'all',
} as const;

const ProductStacks: React.VFC<NoProps> = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [selectedMakerId, setSelectedMakerId] = useState<undefined | string>(
    undefined
  );
  const [selectedTagId, setSelectedTagId] = useState<undefined | string>(
    undefined
  );
  const [selectedInternalUserId, setSelectedInternalUserID] = useState<
    undefined | string
  >(undefined);
  const [productStock, setProductStock] = useState<string>(PRODUCT_STOCK.HAS);
  const hasStock = useMemo(() => {
    return productStock === PRODUCT_STOCK.HAS
      ? true
      : productStock === PRODUCT_STOCK.NOT
      ? false
      : undefined;
  }, [productStock]);

  const { data: makersData } = useInternalGetMakersQuery();
  const { data: productTagGroupsData } = useInternalGetProductTagGroupsQuery();
  const { data: internalUsersData } = useInternalGetInternalUsersQuery();
  const infiniteScrollTarget = useRef<HTMLDivElement>(null);
  const { isIntersect } = useIntersectionObserver(infiniteScrollTarget);

  const { data, loading, error, fetchMore } =
    useInternalGetProductConnectionQuery({
      variables: { first: 10, hasStock: true },
      fetchPolicy: 'network-only',
    });
  const nodes = data?.productConnection?.edges
    ?.map((edge) => edge?.node)
    .filter((node): node is Product => !!node);
  const pageInfo = data?.productConnection?.pageInfo;

  useEffect(() => {
    if (isIntersect && pageInfo?.hasNextPage && !loading) {
      fetchMore({
        variables: {
          first: 10,
          after: pageInfo?.endCursor,
          name,
          makerId: Number(selectedMakerId),
          productTagId: Number(selectedTagId),
          allocatedInternalUserId: Number(selectedInternalUserId),
          hasStock,
        },
      });
    }
  }, [
    isIntersect,
    pageInfo,
    loading,
    fetchMore,
    name,
    selectedMakerId,
    selectedTagId,
    selectedInternalUserId,
    hasStock,
  ]);

  const handleProductClick = useCallback(
    (id: number) => {
      goAdminProductsEdit(router, { id });
    },
    [router]
  );

  const handleSearch = () => {
    fetchMore({
      variables: {
        first: 10,
        name,
        makerId: Number(selectedMakerId),
        productTagId: Number(selectedTagId),
        allocatedInternalUserId: Number(selectedInternalUserId),
        hasStock,
      },
    });
  };

  return (
    <>
      <Card>
        <Box display="flex" flexWrap="wrap">
          <FormControl w="32" id="name" mr="2" mb="2">
            <FormLabel fontSize="sm" mb="1">
              商品名
            </FormLabel>
            <Input
              type="text"
              size="sm"
              placeholder="先頭一致"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          {makersData ? (
            <FormControl w="32" id="makerId" mr="2" mb="2">
              <FormLabel mb="1" fontSize="sm">
                メーカー
              </FormLabel>
              <Select
                placeholder="選択してください"
                size="sm"
                value={selectedMakerId}
                onChange={(e) => setSelectedMakerId(e.target.value)}
              >
                {makersData.makers.map((maker) => (
                  <option key={maker.id} value={maker.id}>
                    {maker.name}
                  </option>
                ))}
              </Select>
            </FormControl>
          ) : null}
          {productTagGroupsData ? (
            <FormControl w="32" id="productTagId" mr="2" mb="2">
              <FormLabel mb="1" fontSize="sm">
                タグ
              </FormLabel>
              <Select
                size="sm"
                placeholder="選択してください"
                value={selectedTagId}
                onChange={(e) => setSelectedTagId(e.target.value)}
              >
                {productTagGroupsData.productTagGroups.map((productTagGroup) =>
                  productTagGroup.productTags.map((productTag) => (
                    <option key={productTag.id} value={productTag.id}>
                      {productTag.name}
                    </option>
                  ))
                )}
              </Select>
            </FormControl>
          ) : null}
          {internalUsersData ? (
            <FormControl w="32" id="allocatedInternalUser" mr="2" mb="2">
              <FormLabel mb="1" fontSize="sm">
                在庫割当ユーザ
              </FormLabel>
              <Select
                size="sm"
                placeholder="選択してください"
                value={selectedInternalUserId}
                onChange={(e) => setSelectedInternalUserID(e.target.value)}
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
        <Box mt="2">
          <RadioGroup onChange={(e) => setProductStock(e)} value={productStock}>
            <Stack direction="row">
              <Radio value={PRODUCT_STOCK.HAS}>在庫あり</Radio>
              <Radio value={PRODUCT_STOCK.NOT}>在庫なし</Radio>
              <Radio value={PRODUCT_STOCK.ALL}>どちらも</Radio>
            </Stack>
          </RadioGroup>
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
                      width="80"
                      height="80"
                      style={{
                        objectFit: 'contain',
                        width: '80px',
                        height: '80px',
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
                        bgColor="primary.light"
                        color="primary.main"
                        fontSize="xs"
                        mr="1"
                        mb="2"
                      >
                        {productTagging.productTag.name}
                      </Tag>
                    ))}
                    <Text fontSize="xs" mb="2">
                      割当：
                      {Array.from(
                        new Set(
                          product.stocks
                            .filter((s) => s.stockAllocation)
                            .map((s) => s.stockAllocation?.internalUser.name)
                        )
                      ).join(', ')}
                    </Text>
                  </Box>
                </Box>
                <Box ml="2">
                  <Text fontSize="sm">総在庫：{product.totalStockAmount}</Text>
                  <Text fontSize="sm">
                    貸出数：{product.allocatedStockAmount}
                  </Text>
                  <Text fontSize="sm">
                    残数：{product.remainingStockAmount}
                  </Text>
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
