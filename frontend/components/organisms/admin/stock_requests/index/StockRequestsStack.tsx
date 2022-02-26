import React, {
  useEffect,
  useRef,
  useState,
  Fragment,
  useCallback,
} from 'react';
import {
  Text,
  Box,
  VStack,
  Divider,
  Button,
  FormControl,
  FormLabel,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { Card } from '@/components/atoms/Card';
import { Spinner } from '@/components/atoms/Spinner';
import {
  useInternalGetStockRequestConnectionQuery,
  useInternalGetInternalUsersQuery,
  useInternalDeleteStockRequestMutation,
} from '@/api/internal_api/types';
import type { StockRequestFieldsFragment } from '@/api/internal_api/types';
import { FlashMessage } from '@/components/molecules/FlashMessage';
import { ErrorMessage } from '@/components/molecules/ErrorMessage';
import { StockRequestSummary } from './stockRequestsStack/StockRequestSummary';
import { useIntersectionObserver } from '@/utils/hooks/useIntersectionObserver';
import { scrollTo } from '@/utils/scroll';

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
    .filter((node): node is StockRequestFieldsFragment => !!node);
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

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedStockRequest, setSelectedStockRequest] =
    useState<null | StockRequestFieldsFragment>(null);
  const handleDeleteModalOpen = useCallback(
    (e: React.MouseEvent, stockRequest: StockRequestFieldsFragment) => {
      e.preventDefault();
      onOpen();
      setSelectedStockRequest(stockRequest);
    },
    [onOpen]
  );
  const [
    deleteStockRequest,
    {
      data: deleteStockRequestData,
      loading: deleteStockRequestLoading,
      error: deleteStockRequestError,
    },
  ] = useInternalDeleteStockRequestMutation();
  const handleDelete = useCallback(async () => {
    if (!selectedStockRequest) return;
    try {
      await deleteStockRequest({ variables: { id: selectedStockRequest.id } });
      await fetchMore({ variables: { first: 10 } });
    } catch {}
    scrollTo();
    onClose();
  }, [deleteStockRequest, selectedStockRequest, onClose, fetchMore]);

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
      {deleteStockRequestData ? (
        <FlashMessage
          message="在庫リクエストを削除しました。"
          status="success"
        />
      ) : null}
      {deleteStockRequestError ? (
        <ErrorMessage error={deleteStockRequestError} />
      ) : null}
      <VStack spacing="0" mt="4" alignItems="flex-start">
        <Divider />
        {nodes?.map((stockRequest) => (
          <Fragment key={Number(stockRequest.id)}>
            <StockRequestSummary
              stockRequest={stockRequest}
              handleDeleteModalOpen={handleDeleteModalOpen}
            />
            <Divider />
          </Fragment>
        ))}
      </VStack>
      <Box textAlign="center">
        <Spinner loading={loading} />
      </Box>
      <Box w="2" h="2" ref={infiniteScrollTarget} id="target" />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>在庫リクエストの取り下げ</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              {selectedStockRequest?.internalUser.name}
              の以下の在庫リクエストを取り下げますか？
            </Text>
            <Box my="4">
              {selectedStockRequest?.productRegistrations.map(
                (productRegistration) => {
                  return (
                    <Box
                      m="1"
                      key={productRegistration.id}
                      display="flex"
                      alignItems="center"
                    >
                      <img
                        src={productRegistration.product.url}
                        alt={productRegistration.product.name}
                        width="40"
                        height="40"
                        style={{
                          objectFit: 'contain',
                          width: '40px',
                          height: '40px',
                        }}
                      />
                      <Text ml="2" size="sm">
                        {productRegistration.product.name}
                      </Text>
                    </Box>
                  );
                }
              )}
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              キャンセル
            </Button>
            <Button
              bgColor="primary.main"
              color="white"
              isLoading={deleteStockRequestLoading}
              onClick={handleDelete}
            >
              取り下げる
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export { StockRequestsStack };
