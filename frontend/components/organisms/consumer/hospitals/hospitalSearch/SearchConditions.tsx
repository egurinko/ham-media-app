import { Dispatch, SetStateAction, useCallback } from 'react';
import { Tag, Text, HStack, Button } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
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

const SearchConditions: React.FC<Props> = ({
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
  const clearAll = useCallback(() => {
    setReservable(false);
    setNightServiceOption(false);
    setInsuranceEnabled(false);
    setJsavaOption(false);
    setNichijuOption(false);
    getInitialHospitalConnection({
      reservable: false,
      nightServiceOption: false,
      insuranceEnabled: false,
      jsavaOption: false,
      nichijuOption: false,
    });
  }, []);

  const clearReservable = useCallback(() => {
    setReservable(false);
    getInitialHospitalConnection({
      reservable: false,
    });
  }, []);

  const clearNightServiceOption = useCallback(() => {
    setNightServiceOption(false);
    getInitialHospitalConnection({
      nightServiceOption: false,
    });
  }, []);

  const clearInsuranceEnabled = useCallback(() => {
    setInsuranceEnabled(false);
    getInitialHospitalConnection({
      insuranceEnabled: false,
    });
  }, []);

  const clearJsavaOption = useCallback(() => {
    setJsavaOption(false);
    getInitialHospitalConnection({
      jsavaOption: false,
    });
  }, []);

  const clearNichijuOption = useCallback(() => {
    setNichijuOption(false);
    getInitialHospitalConnection({
      nichijuOption: false,
    });
  }, []);

  return (
    <HStack spacing={2} wrap="wrap">
      {!reservable &&
      !nightServiceOption &&
      !insuranceEnabled &&
      !jsavaOption &&
      !nichijuOption ? null : (
        <Button
          onClick={clearAll}
          borderRadius={100}
          p="2"
          my="2"
          colorScheme="primary"
          boxShadow="sm"
          size="sm"
          rightIcon={<CloseIcon fontSize="xs" ml="1" />}
        >
          <Text fontSize="sm">全条件クリア</Text>
        </Button>
      )}

      {!reservable || (
        <Button
          onClick={clearReservable}
          borderRadius={100}
          p="2"
          my="2"
          colorScheme="primary"
          boxShadow="sm"
          size="sm"
          rightIcon={<CloseIcon fontSize="xs" ml="1" />}
        >
          <Text fontSize="sm">予約可</Text>
        </Button>
      )}
      {!nightServiceOption || (
        <Button
          onClick={clearNightServiceOption}
          borderRadius={100}
          p="2"
          my="2"
          colorScheme="primary"
          boxShadow="sm"
          size="sm"
          rightIcon={<CloseIcon fontSize="xs" ml="1" />}
        >
          <Text fontSize="sm">夜間営業</Text>
        </Button>
      )}
      {!insuranceEnabled || (
        <Button
          onClick={clearInsuranceEnabled}
          borderRadius={100}
          p="2"
          my="2"
          colorScheme="primary"
          boxShadow="sm"
          size="sm"
          rightIcon={<CloseIcon fontSize="xs" ml="1" />}
        >
          <Text fontSize="sm">保険適用可</Text>
        </Button>
      )}
      {!jsavaOption || (
        <Button
          onClick={clearJsavaOption}
          borderRadius={100}
          p="2"
          my="2"
          colorScheme="primary"
          boxShadow="sm"
          size="sm"
          rightIcon={<CloseIcon fontSize="xs" ml="1" />}
        >
          <Text fontSize="sm">日本小動物獣医師会 (JSAVA) 認定あり</Text>
        </Button>
      )}
      {!nichijuOption || (
        <Button
          onClick={clearNichijuOption}
          borderRadius={100}
          p="2"
          my="2"
          colorScheme="primary"
          boxShadow="sm"
          size="sm"
          rightIcon={<CloseIcon fontSize="xs" ml="1" />}
        >
          <Text fontSize="sm">日本獣医師会認定あり</Text>
        </Button>
      )}
    </HStack>
  );
};

export default SearchConditions;
