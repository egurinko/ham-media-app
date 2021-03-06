import { NotAllowedIcon, CheckIcon } from '@chakra-ui/icons';
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
import { useRouter } from 'next/router';
import { useCallback, useState, memo } from 'react';
import {
  useInternalGetStockRequestQuery,
  useInternalRejectStockRequestMutation,
  useInternalApproveStockRequestMutation,
} from '@/api/internal_api/types';
import type { StockRequest } from '@/api/internal_api/types';
import { PrimaryButton } from '@/components/atoms/PrimaryButton';
import { ErrorMessage } from '@/components/molecules/ErrorMessage';
import { SuccessMessage } from '@/components/molecules/SuccessMessage';
import { goAdminStockRequests } from '@/utils/routes';
import type { FC } from 'react';

type Props = {
  stockRequestId: StockRequest['id'];
};

const Review: FC<Props> = ({ stockRequestId }) => {
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
        message="??????????????????????????????????????????"
      />
      <ErrorMessage error={rejectError} />
      <SuccessMessage
        data={approveData}
        message="??????????????????????????????????????????"
      />
      <ErrorMessage error={approveError} />
      <Box textAlign="right">
        <Button mr={['2', '6']} onClick={onRejectModalOpen}>
          <NotAllowedIcon mr="1" />
          ??????
        </Button>
        <PrimaryButton onClick={onApproveModalOpen}>
          <CheckIcon mr="1" />
          ??????
        </PrimaryButton>
      </Box>
      {data ? (
        <>
          <Modal isOpen={isRejectModalOpen} onClose={onRejectModalClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>??????????????????????????????</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>
                  {data.stockRequest.internalUser.name}
                  ?????????????????????????????????????????????????????????
                </Text>
                <Box my="4">
                  {data.stockRequest.productRegistrations.map(
                    (productRegistration) => (
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
                    )
                  )}
                </Box>
                <FormControl>
                  <FormLabel htmlFor="message">?????????????????????</FormLabel>
                  <Textarea
                    id="message"
                    placeholder="??????????????????????????????????????????????????????????????????"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <FormHelperText>
                    ?????????????????????????????????????????????????????????
                  </FormHelperText>
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button variant="ghost" mr={3} onClick={onRejectModalClose}>
                  ???????????????
                </Button>
                <PrimaryButton isLoading={rejectLoading} onClick={handleReject}>
                  ????????????
                </PrimaryButton>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <Modal isOpen={isApproveModalOpen} onClose={onApproveModalClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>??????????????????????????????</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>
                  {data.stockRequest.internalUser.name}
                  ?????????????????????????????????????????????????????????
                </Text>
                <Box my="4">
                  {data.stockRequest.productRegistrations.map(
                    (productRegistration) => (
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
                    )
                  )}
                </Box>
                <FormControl>
                  <FormLabel htmlFor="message">?????????????????????</FormLabel>
                  <Textarea
                    id="message"
                    placeholder="????????????????????????????????????"
                    value={approveMessage}
                    onChange={(e) => setApproveMessage(e.target.value)}
                  />
                  <FormHelperText>?????????????????????</FormHelperText>
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button variant="ghost" mr={3} onClick={onApproveModalClose}>
                  ???????????????
                </Button>
                <PrimaryButton
                  isLoading={approveLoading}
                  onClick={handleApprove}
                >
                  ????????????
                </PrimaryButton>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      ) : null}
    </>
  );
};

const Memoed = memo(Review);

export { Memoed as Review };
