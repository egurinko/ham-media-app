import { ArrowUpIcon } from '@chakra-ui/icons';
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
  Checkbox,
  useDisclosure,
  Text,
} from '@chakra-ui/react';
import { useCallback, useEffect, useState, memo } from 'react';
import { useLocalGetHospitalSearchQuery } from '@/api/local_api/types';
import { SecondaryButton } from '@/components/atoms/SecondaryButton';
import { FilterIcon } from '@/components/atoms/assets/FilterIcon';
import { hospitalSearchVar } from '@/utils/apollo/cache';
import { scrollTo } from '@/utils/scroll';
import type { FC } from 'react';

const Filter: FC<NoProps> = () => {
  const { data: searchData } = useLocalGetHospitalSearchQuery();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalReservable, setModalReservable] = useState(false);
  const [modalNightServiceOption, setModalNightServiceOption] = useState(false);
  const [modalInsuranceEnabled, setModalInsuranceEnabled] = useState(false);
  const [modalJsavaOption, setModalJsavaOption] = useState(false);
  const [modalNichijuOption, setModalNichijuOption] = useState(false);
  const [modalRecommended, setModalRecommended] = useState(false);

  const copyApplied = useCallback((): void => {
    if (searchData?.hospitalSearch) {
      setModalReservable(searchData.hospitalSearch.reservable);
      setModalNightServiceOption(searchData.hospitalSearch.nightServiceOption);
      setModalInsuranceEnabled(searchData.hospitalSearch.insuranceEnabled);
      setModalJsavaOption(searchData.hospitalSearch.jsavaOption);
      setModalNichijuOption(searchData.hospitalSearch.nichijuOption);
      setModalRecommended(searchData.hospitalSearch.recommended);
    }
  }, [
    searchData,
    setModalReservable,
    setModalNightServiceOption,
    setModalJsavaOption,
    setModalInsuranceEnabled,
    setModalNichijuOption,
    setModalRecommended,
  ]);

  const copyLocal = useCallback((): void => {
    hospitalSearchVar({
      ...hospitalSearchVar(),
      reservable: modalReservable,
      nightServiceOption: modalNightServiceOption,
      insuranceEnabled: modalInsuranceEnabled,
      jsavaOption: modalJsavaOption,
      nichijuOption: modalNichijuOption,
      recommended: modalRecommended,
    });
  }, [
    modalReservable,
    modalNightServiceOption,
    modalInsuranceEnabled,
    modalJsavaOption,
    modalNichijuOption,
    modalRecommended,
  ]);

  useEffect(() => {
    copyApplied;
  }, [copyApplied]);

  const handleSearchClick = useCallback((): void => {
    copyLocal();
    onClose();
  }, [onClose, copyLocal]);

  const handleCancel = useCallback((): void => {
    copyApplied();
    onClose();
  }, [onClose, copyApplied]);

  return (
    <>
      <Box
        position="fixed"
        right="3%"
        bottom="3%"
        display="flex"
        flexDir="column"
        alignItems="flex-end"
      >
        <SecondaryButton
          onClick={() => scrollTo()}
          borderRadius="50%"
          boxShadow="lg"
          p="0"
          mb="4"
        >
          <ArrowUpIcon fontWeight="bold" fontSize="2xl" color="primary.main" />
        </SecondaryButton>
        <Button
          onClick={onOpen}
          leftIcon={
            <Box fill="text.main">
              <FilterIcon width={20} height={20} />
            </Box>
          }
          borderRadius={50}
          boxShadow="lg"
        >
          ?????????????????????
        </Button>
      </Box>
      <Modal
        isOpen={isOpen}
        onClose={handleCancel}
        motionPreset="slideInBottom"
        size="full"
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>??????????????????</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box mb="6" display="flex" flexDir="column">
              <Text
                borderLeft="4px"
                borderColor="primary.main"
                fontSize="lg"
                pl="2"
                mb="4"
              >
                ??????????????????????????????
              </Text>
              <Checkbox
                onChange={(e) => setModalRecommended(e.target.checked)}
                checked={modalRecommended}
                defaultChecked={modalRecommended}
                colorScheme="primary"
                p="2"
                border="1px"
                borderColor="border.gray"
                borderRadius={5}
                mb="4"
                w="28"
              >
                ????????????
              </Checkbox>
            </Box>
            <Box mb="6" display="flex" flexDir="column">
              <Text
                borderLeft="4px"
                borderColor="primary.main"
                fontSize="lg"
                pl="2"
                mb="4"
              >
                ????????????
              </Text>
              <Checkbox
                onChange={(e) => setModalReservable(e.target.checked)}
                checked={modalReservable}
                defaultChecked={modalReservable}
                colorScheme="primary"
                p="2"
                border="1px"
                borderColor="border.gray"
                borderRadius={5}
                mb="4"
                w="24"
              >
                ?????????
              </Checkbox>
              <Checkbox
                onChange={(e) => setModalNightServiceOption(e.target.checked)}
                checked={modalNightServiceOption}
                defaultChecked={modalNightServiceOption}
                colorScheme="primary"
                p="2"
                border="1px"
                borderColor="border.gray"
                borderRadius={5}
                mb="4"
                w="28"
              >
                ????????????
              </Checkbox>
              <Checkbox
                onChange={(e) => setModalInsuranceEnabled(e.target.checked)}
                checked={modalInsuranceEnabled}
                defaultChecked={modalInsuranceEnabled}
                colorScheme="primary"
                p="2"
                border="1px"
                borderColor="border.gray"
                borderRadius={5}
                mb="4"
                w="32"
              >
                ???????????????
              </Checkbox>
            </Box>
            <Box>
              <Text
                borderLeft="4px"
                borderColor="primary.main"
                fontSize="lg"
                pl="2"
                mb="4"
              >
                ??????
              </Text>
              <Checkbox
                onChange={(e) => setModalJsavaOption(e.target.checked)}
                checked={modalJsavaOption}
                defaultChecked={modalJsavaOption}
                colorScheme="primary"
                p="2"
                border="1px"
                borderColor="border.gray"
                borderRadius={5}
                mb="4"
                w="72"
              >
                ??????????????????????????? (JSAVA) ??????
              </Checkbox>
              <Checkbox
                onChange={(e) => setModalNichijuOption(e.target.checked)}
                checked={modalNichijuOption}
                defaultChecked={modalNichijuOption}
                colorScheme="primary"
                p="2"
                border="1px"
                borderColor="border.gray"
                borderRadius={5}
                mb="4"
                w="42"
              >
                ????????????????????????
              </Checkbox>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button variant="outline" mr={3} onClick={handleCancel}>
              ???????????????
            </Button>
            <Button colorScheme="primary" onClick={handleSearchClick}>
              ????????????
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const Memoed = memo(Filter);

export { Memoed as Filter };
