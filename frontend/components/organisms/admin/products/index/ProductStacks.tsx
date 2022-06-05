import {
  Skeleton,
  Box,
  VStack,
  Divider,
  Input,
  FormControl,
  FormLabel,
  Select,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react';
import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  Fragment,
  memo,
  useCallback,
} from 'react';
import {
  useInternalGetProductConnectionQuery,
  useInternalGetMakersQuery,
  useInternalGetProductTagGroupsQuery,
  useInternalGetInternalUsersQuery,
} from '@/api/internal_api/types';
import type { ProductFieldsFragment } from '@/api/internal_api/types';
import { Card } from '@/components/atoms/Card';
import { PrimaryButton } from '@/components/atoms/PrimaryButton';
import { SecondaryButton } from '@/components/atoms/SecondaryButton';
import { Spinner } from '@/components/atoms/Spinner';
import { ErrorMessage } from '@/components/molecules/ErrorMessage';
import { SummaryLink } from '@/components/molecules/SummaryLink';
import { useIntersectionObserver } from '@/utils/hooks/useIntersectionObserver';
import { ADMIN_PRODUCTS_DETAIL_PATH } from '@/utils/routes';
import { ProductSummary } from '../ProductSummary';
import type { FC } from 'react';

const PRODUCT_STOCK = {
  HAS: 'has',
  NOT: 'not',
  ALL: 'all',
} as const;

const ProductStacks: FC<NoProps> = () => {
  const [name, setName] = useState('');
  const [selectedMakerId, setSelectedMakerId] = useState<string>('');
  const [selectedTagId, setSelectedTagId] = useState<string>('');
  const [selectedAllocatedInternalUserId, setSelectedAllocatedInternalUserID] =
    useState<string>('');
  const [selectedInternalUserId, setSelectedInternalUserID] =
    useState<string>('');
  const [productStock, setProductStock] = useState<string>(PRODUCT_STOCK.HAS);
  const hasStock = useMemo(
    () =>
      productStock === PRODUCT_STOCK.HAS
        ? true
        : productStock === PRODUCT_STOCK.NOT
        ? false
        : undefined,
    [productStock]
  );

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
    .filter((node): node is ProductFieldsFragment => !!node);
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
          internalUserId: Number(selectedInternalUserId),
          allocatedInternalUserId: Number(selectedAllocatedInternalUserId),
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
    selectedAllocatedInternalUserId,
    hasStock,
  ]);

  const handleSearch = () => {
    fetchMore({
      variables: {
        first: 10,
        name,
        makerId: Number(selectedMakerId),
        productTagId: Number(selectedTagId),
        internalUserId: Number(selectedInternalUserId),
        allocatedInternalUserId: Number(selectedAllocatedInternalUserId),
        hasStock,
      },
    });
  };

  const handleClear = useCallback(() => {
    setName('');
    setSelectedMakerId('');
    setSelectedTagId('');
    setSelectedAllocatedInternalUserID('');
    setSelectedInternalUserID('');
    fetchMore({
      variables: {
        first: 10,
        name: '',
        makerId: undefined,
        productTagId: undefined,
        internalUserId: undefined,
        allocatedInternalUserId: undefined,
        hasStock,
      },
    });
  }, [fetchMore, hasStock]);

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
              placeholder="部分一致"
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
                value={selectedAllocatedInternalUserId}
                onChange={(e) =>
                  setSelectedAllocatedInternalUserID(e.target.value)
                }
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
          {internalUsersData ? (
            <FormControl w="32" id="internalUser" mr="2" mb="2">
              <FormLabel mb="1" fontSize="sm">
                在庫責任者
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
          <SecondaryButton onClick={handleClear} mt="4" mr="8">
            クリア
          </SecondaryButton>
          <PrimaryButton onClick={handleSearch} mt="4">
            検索
          </PrimaryButton>
        </Box>
      </Card>
      <Skeleton isLoaded={!loading}>
        <VStack spacing="0" mt="4" alignItems="flex-start">
          <ErrorMessage error={error} />
          <Divider />
          {nodes?.map((product) => (
            <Fragment key={product.id}>
              <SummaryLink url={ADMIN_PRODUCTS_DETAIL_PATH(product.id)}>
                <ProductSummary product={product} />
              </SummaryLink>
              <Divider />
            </Fragment>
          ))}
        </VStack>
      </Skeleton>
      <Box textAlign="center">
        <Spinner loading={loading} />
      </Box>
      <Box w="2" h="2" ref={infiniteScrollTarget} id="target" />
    </>
  );
};

const Memoed = memo(ProductStacks);

export { Memoed as ProductStacks };
