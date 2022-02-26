import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Button,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  FormControl,
  FormLabel,
  Textarea,
  FormHelperText,
} from '@chakra-ui/react';
import { NotAllowedIcon, CheckIcon } from '@chakra-ui/icons';
import { PrimaryButton } from '@/components/atoms/PrimaryButton';
import { SuccessMessage } from '@/components/molecules/SuccessMessage';
import { ErrorMessage } from '@/components/molecules/ErrorMessage';
import {
  useInternalGetStockRequestQuery,
  useInternalRejectStockRequestMutation,
  useInternalApproveStockRequestMutation,
} from '@/api/internal_api/types';
import type { StockRequest } from '@/api/internal_api/types';
import { goAdminStockRequests } from '@/utils/routes';

type Props = {
  stockRequestId: StockRequest['id'];
};

const Review: React.VFC<Props> = ({ stockRequestId }) => {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const {
    isOpen: isRejectModalOpen,
    onOpen: onRejectModalOpen,
    onClose: onRejectModalClose,
  } = useDisclosure();
  const [approveMessage, setApproveMessage] = useState('');
  const {
    isOpen: isApproveModalOpen,
    onOpen: onApproveModalOpen,
    onClose: onApproveModalClose,
  } = useDisclosure();
  const { data } = useInternalGetStockRequestQuery({
    variables: { id: stockRequestId },
  });
  const [
    reject,
    { data: rejectData, error: rejectError, loading: rejectLoading },
  ] = useInternalRejectStockRequestMutation();

  const handleReject = useCallback(async () => {
    try {
      await reject({ variables: { id: stockRequestId, message } });
      setTimeout(() => {
        goAdminStockRequests(router);
      }, 2000);
    } catch {}
    onRejectModalClose();
  }, [message, reject, stockRequestId, onRejectModalClose, router]);

  const [
    approve,
    { data: approveData, loading: approveLoading, error: approveError },
  ] = useInternalApproveStockRequestMutation();
  const handleApprove = useCallback(async () => {
    try {
      await approve({
        variables: { id: stockRequestId, message: approveMessage },
      });
      setTimeout(() => {
        goAdminStockRequests(router);
      }, 2000);
    } catch {}
    onApproveModalClose();
  }, [approveMessage, approve, stockRequestId, onApproveModalClose, router]);

  return (
    <>
      <SuccessMessage
        data={rejectData}
        message="在庫リクエストを棄却しました"
      />
      <ErrorMessage error={rejectError} />
      <SuccessMessage
        data={approveData}
        message="在庫リクエストを承認しました"
      />
      <ErrorMessage error={approveError} />
      <Box textAlign="right">
        <Button mr={['2', '6']} onClick={onRejectModalOpen}>
          <NotAllowedIcon mr="1" />
          棄却
        </Button>
        <PrimaryButton onClick={onApproveModalOpen}>
          <CheckIcon mr="1" />
          承認
        </PrimaryButton>
      </Box>
      {data ? (
        <>
          <Modal isOpen={isRejectModalOpen} onClose={onRejectModalClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>在庫リクエストの棄却</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>
                  {data.stockRequest.internalUser.name}
                  の以下の在庫リクエストを棄却しますか？
                </Text>
                <Box my="4">
                  {data.stockRequest.productRegistrations.map(
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
                <FormControl>
                  <FormLabel htmlFor="message">棄却メッセージ</FormLabel>
                  <Textarea
                    id="message"
                    placeholder="在庫が足りないので別の商品を選択してください"
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <FormHelperText>
                    通知に入るので理由などをお書きください
                  </FormHelperText>
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button variant="ghost" mr={3} onClick={onRejectModalClose}>
                  キャンセル
                </Button>
                <PrimaryButton isLoading={rejectLoading} onClick={handleReject}>
                  棄却する
                </PrimaryButton>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <Modal isOpen={isApproveModalOpen} onClose={onApproveModalClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>在庫リクエストの承認</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>
                  {data.stockRequest.internalUser.name}
                  の以下の在庫リクエストを承認しますか？
                </Text>
                <Box my="4">
                  {data.stockRequest.productRegistrations.map(
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
                <FormControl>
                  <FormLabel htmlFor="message">承認メッセージ</FormLabel>
                  <Textarea
                    id="message"
                    placeholder="一週間を目処に発送します"
                    type="text"
                    value={approveMessage}
                    onChange={(e) => setApproveMessage(e.target.value)}
                  />
                  <FormHelperText>通知に入ります</FormHelperText>
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button variant="ghost" mr={3} onClick={onApproveModalClose}>
                  キャンセル
                </Button>
                <PrimaryButton
                  isLoading={approveLoading}
                  onClick={handleApprove}
                >
                  承認する
                </PrimaryButton>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      ) : null}
    </>
  );
};

export { Review };
