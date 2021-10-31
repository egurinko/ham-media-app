import { Dispatch, SetStateAction, useCallback } from 'react';
import { Text, HStack, Button } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { PublicGetHospitalConnectionQueryVariables } from '@/api/public_api/types';
import { apiClient } from '@/utils/apollo';

type Props = {
  setSearchText: Dispatch<
    SetStateAction<PublicGetHospitalConnectionQueryVariables['searchText']>
  >;
  setCurrentLocation: Dispatch<
    SetStateAction<PublicGetHospitalConnectionQueryVariables['currentLocation']>
  >;
  reservable: PublicGetHospitalConnectionQueryVariables['reservable'];
  setReservable: Dispatch<
    SetStateAction<PublicGetHospitalConnectionQueryVariables['reservable']>
  >;
  nightServiceOption: PublicGetHospitalConnectionQueryVariables['nightServiceOption'];
  setNightServiceOption: Dispatch<
    SetStateAction<
      PublicGetHospitalConnectionQueryVariables['nightServiceOption']
    >
  >;
  insuranceEnabled: PublicGetHospitalConnectionQueryVariables['insuranceEnabled'];
  setInsuranceEnabled: Dispatch<
    SetStateAction<
      PublicGetHospitalConnectionQueryVariables['insuranceEnabled']
    >
  >;
  jsavaOption: PublicGetHospitalConnectionQueryVariables['jsavaOption'];
  setJsavaOption: Dispatch<
    SetStateAction<PublicGetHospitalConnectionQueryVariables['jsavaOption']>
  >;
  nichijuOption: PublicGetHospitalConnectionQueryVariables['nichijuOption'];
  setNichijuOption: Dispatch<
    SetStateAction<PublicGetHospitalConnectionQueryVariables['nichijuOption']>
  >;
  getInitialHospitalConnection: (
    variables: Partial<PublicGetHospitalConnectionQueryVariables>
  ) => void;
};

const SearchConditions: React.FC<Props> = ({
  setSearchText,
  setCurrentLocation,
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
    setSearchText('');
    setCurrentLocation(null);
    setReservable(false);
    setNightServiceOption(false);
    setInsuranceEnabled(false);
    setJsavaOption(false);
    setNichijuOption(false);
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

      {!reservable || (
        <Button
          onClick={clearReservable}
          borderRadius={100}
          p="2"
          my="2"
          variant="outline"
          borderColor="primary.main"
          bgColor="primary.light"
          color="primary.main"
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
          variant="outline"
          borderColor="primary.main"
          bgColor="primary.light"
          color="primary.main"
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
          variant="outline"
          borderColor="primary.main"
          bgColor="primary.light"
          color="primary.main"
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
          variant="outline"
          borderColor="primary.main"
          bgColor="primary.light"
          color="primary.main"
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
          variant="outline"
          borderColor="primary.main"
          bgColor="primary.light"
          color="primary.main"
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
