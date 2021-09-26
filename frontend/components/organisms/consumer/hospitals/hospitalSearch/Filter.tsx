import { Dispatch, SetStateAction, useState } from 'react';
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
import FilterIcon from '@/components/atoms/assets/FilterIcon';
import { PublicGetHospitalConnectionQueryVariables } from '@/api/public_api/types';

type Props = {
  reservable: boolean;
  setReservable: Dispatch<SetStateAction<boolean>>;
  nightServiceOption: boolean;
  setNightServiceOption: Dispatch<SetStateAction<boolean>>;
  insuranceEnabled: boolean;
  setInsuranceEnabled: Dispatch<SetStateAction<boolean>>;
  jsavaOption: boolean;
  setJsavaOption: Dispatch<SetStateAction<boolean>>;
  nichijuOption: boolean;
  setNichijuOption: Dispatch<SetStateAction<boolean>>;
  getInitialHospitalConnection: (
    variables: Partial<PublicGetHospitalConnectionQueryVariables>
  ) => void;
};

const Filter: React.FC<Props> = ({
  reservable,
  setReservable,
  nightServiceOption,
  setNightServiceOption,
  insuranceEnabled,
  setInsuranceEnabled,
  jsavaOption,
  setJsavaOption,
  nichijuOption,
  setNichijuOption,
  getInitialHospitalConnection,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalReservable, setModalReservable] = useState(reservable);
  const [modalNightServiceOption, setModalNightServiceOption] =
    useState(nightServiceOption);
  const [modalInsuranceEnabled, setModalInsuranceEnabled] =
    useState(insuranceEnabled);
  const [modalJsavaOption, setModalJsavaOption] = useState(jsavaOption);
  const [modalNichijuOption, setModalNichijuOption] = useState(nichijuOption);

  const handleSearchClick = (): void => {
    copyModalState();
    getInitialHospitalConnection({
      reservable: modalReservable,
      nightServiceOption: modalNightServiceOption,
      insuranceEnabled: modalInsuranceEnabled,
      jsavaOption: modalJsavaOption,
      nichijuOption: modalNichijuOption,
    });
    onClose();
  };

  const copyModalState = (): void => {
    setReservable(modalReservable);
    setNightServiceOption(modalNightServiceOption);
    setInsuranceEnabled(modalInsuranceEnabled);
    setJsavaOption(modalJsavaOption);
    setNichijuOption(modalNichijuOption);
  };

  const handleCancel = (): void => {
    revertModalState();
    onClose();
  };

  const revertModalState = (): void => {
    setModalReservable(reservable);
    setModalNightServiceOption(nightServiceOption);
    setModalInsuranceEnabled(insuranceEnabled);
    setModalJsavaOption(jsavaOption);
    setModalNichijuOption(nichijuOption);
  };

  return (
    <>
      <Box position="fixed" right="3%" bottom="3%">
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
          さらに絞り込む
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
          <ModalHeader>絞り込み検索</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box mb="8">
              <Text
                borderLeft="4px"
                borderColor="primary.main"
                fontSize="lg"
                pl="2"
                mb="4"
              >
                予約
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
              >
                予約可
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
                その他
              </Text>
              <Checkbox
                onChange={(e) => setModalNightServiceOption(e.target.checked)}
                checked={modalNightServiceOption}
                defaultChecked={modalNightServiceOption}
                colorScheme="primary"
                p="2"
                border="1px"
                borderColor="border.gray"
                borderRadius={5}
                mr="2"
                mb="2"
              >
                夜間営業
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
                mr="2"
                mb="2"
              >
                保険適用可
              </Checkbox>
              <Checkbox
                onChange={(e) => setModalJsavaOption(e.target.checked)}
                checked={modalJsavaOption}
                defaultChecked={modalJsavaOption}
                colorScheme="primary"
                p="2"
                border="1px"
                borderColor="border.gray"
                borderRadius={5}
                mr="2"
                mb="2"
              >
                日本小動物獣医師会 (JSAVA) 認定あり
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
                mr="2"
                mb="2"
              >
                日本獣医師会認定あり
              </Checkbox>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button variant="outline" mr={3} onClick={handleCancel}>
              キャンセル
            </Button>
            <Button colorScheme="primary" onClick={handleSearchClick}>
              検索する
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Filter;
