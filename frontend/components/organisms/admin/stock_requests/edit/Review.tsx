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
import { FlashMessage } from '@/components/molecules/FlashMessage';
import { ErrorMessage } from '@/components/molecules/ErrorMessage';
import {
  useInternalGetStockRequestQuery,
  useInternalRejectStockRequestMutation,
} from '@/api/internal_api/types';
import type { StockRequest } from '@/api/internal_api/types';
import { goAdminStockRequests } from '@/utils/routes';

type Props = {
  stockRequestId: StockRequest['id'];
};

const Review: React.VFC<Props> = ({ stockRequestId }) => {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
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
    onClose();
  }, [message, reject, stockRequestId, onClose, router]);

  return (
    <>
      {rejectData ? (
        <FlashMessage message="在庫リクエストを棄却しました" status="success" />
      ) : null}
      {rejectError ? <ErrorMessage error={rejectError} /> : null}

      <Box textAlign="right">
        <Button mr={['2', '6']} onClick={onOpen}>
          <NotAllowedIcon mr="1" />
          棄却
        </Button>
        <Button bgColor="primary.main" color="white">
          <CheckIcon mr="1" />
          承認
        </Button>
      </Box>
      {data ? (
        <Modal isOpen={isOpen} onClose={onClose}>
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
              <Button variant="ghost" mr={3} onClick={onClose}>
                キャンセル
              </Button>
              <Button
                bgColor="primary.main"
                color="white"
                isLoading={rejectLoading}
                onClick={handleReject}
              >
                削除する
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      ) : null}
    </>
  );
};

export { Review };
