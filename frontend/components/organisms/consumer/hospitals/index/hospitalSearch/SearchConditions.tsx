import { CloseIcon } from '@chakra-ui/icons';
import { Text, Flex, Button } from '@chakra-ui/react';
import { useCallback, memo } from 'react';
import { SecondaryButton } from '@/components/atoms/SecondaryButton';
import type {
  SetSearchText,
  SetCurrentLocation,
  Reservable,
  SetReservable,
  NightServiceOption,
  SetNightServiceOption,
  InsuranceEnabled,
  SetInsuranceEnabled,
  NichijuOption,
  SetNichijuOption,
  JsavaOption,
  SetJsavaOption,
  Recommended,
  SetRecommended,
} from '../types';

type Props = {
  setSearchText: SetSearchText;
  setCurrentLocation: SetCurrentLocation;
  reservable: Reservable;
  setReservable: SetReservable;
  nightServiceOption: NightServiceOption;
  setNightServiceOption: SetNightServiceOption;
  insuranceEnabled: InsuranceEnabled;
  setInsuranceEnabled: SetInsuranceEnabled;
  jsavaOption: JsavaOption;
  setJsavaOption: SetJsavaOption;
  nichijuOption: NichijuOption;
  setNichijuOption: SetNichijuOption;
  recommended: Recommended;
  setRecommended: SetRecommended;
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
  recommended,
  setRecommended,
}) => {
  const clearAll = useCallback(() => {
    setSearchText('');
    setCurrentLocation(null);
    setReservable(false);
    setNightServiceOption(false);
    setInsuranceEnabled(false);
    setJsavaOption(false);
    setNichijuOption(false);
    setRecommended(false);
  }, [
    setSearchText,
    setCurrentLocation,
    setReservable,
    setNightServiceOption,
    setInsuranceEnabled,
    setJsavaOption,
    setNichijuOption,
    setRecommended,
  ]);

  const clearReservable = useCallback(() => {
    setReservable(false);
  }, [setReservable]);

  const clearNightServiceOption = useCallback(() => {
    setNightServiceOption(false);
  }, [setNightServiceOption]);

  const clearInsuranceEnabled = useCallback(() => {
    setInsuranceEnabled(false);
  }, [setInsuranceEnabled]);

  const clearJsavaOption = useCallback(() => {
    setJsavaOption(false);
  }, [setJsavaOption]);

  const clearNichijuOption = useCallback(() => {
    setNichijuOption(false);
  }, [setNichijuOption]);

  const clearRecommended = useCallback(() => {
    setRecommended(false);
  }, [setRecommended]);

  return (
    <Flex wrap="wrap">
      <Button
        onClick={clearAll}
        borderRadius={100}
        p="2"
        m="1"
        colorScheme="primary"
        boxShadow="sm"
        size="sm"
        rightIcon={<CloseIcon fontSize="xs" ml="1" />}
      >
        <Text fontSize="sm">全条件クリア</Text>
      </Button>

      {!reservable || (
        <SecondaryButton
          onClick={clearReservable}
          borderRadius={100}
          p="2"
          m="1"
          variant="outline"
          borderColor="primary.main"
          boxShadow="sm"
          size="sm"
          rightIcon={<CloseIcon fontSize="xs" ml="1" />}
        >
          <Text fontSize="sm">予約可</Text>
        </SecondaryButton>
      )}
      {!nightServiceOption || (
        <SecondaryButton
          onClick={clearNightServiceOption}
          borderRadius={100}
          p="2"
          m="1"
          variant="outline"
          borderColor="primary.main"
          boxShadow="sm"
          size="sm"
          rightIcon={<CloseIcon fontSize="xs" ml="1" />}
        >
          <Text fontSize="sm">夜間営業</Text>
        </SecondaryButton>
      )}
      {!insuranceEnabled || (
        <SecondaryButton
          onClick={clearInsuranceEnabled}
          borderRadius={100}
          p="2"
          m="1"
          variant="outline"
          borderColor="primary.main"
          boxShadow="sm"
          size="sm"
          rightIcon={<CloseIcon fontSize="xs" ml="1" />}
        >
          <Text fontSize="sm">保険適用可</Text>
        </SecondaryButton>
      )}
      {!jsavaOption || (
        <SecondaryButton
          onClick={clearJsavaOption}
          borderRadius={100}
          p="2"
          m="1"
          variant="outline"
          borderColor="primary.main"
          boxShadow="sm"
          size="sm"
          rightIcon={<CloseIcon fontSize="xs" ml="1" />}
        >
          <Text fontSize="sm">日本小動物獣医師会 (JSAVA) 認定あり</Text>
        </SecondaryButton>
      )}
      {!nichijuOption || (
        <SecondaryButton
          onClick={clearNichijuOption}
          borderRadius={100}
          p="2"
          m="1"
          variant="outline"
          borderColor="primary.main"
          boxShadow="sm"
          size="sm"
          rightIcon={<CloseIcon fontSize="xs" ml="1" />}
        >
          <Text fontSize="sm">日本獣医師会認定あり</Text>
        </SecondaryButton>
      )}
      {!recommended || (
        <SecondaryButton
          onClick={clearRecommended}
          borderRadius={100}
          p="2"
          m="1"
          variant="outline"
          borderColor="primary.main"
          boxShadow="sm"
          size="sm"
          rightIcon={<CloseIcon fontSize="xs" ml="1" />}
        >
          <Text fontSize="sm">おすすめ</Text>
        </SecondaryButton>
      )}
    </Flex>
  );
};

const Memoed = memo(SearchConditions);

export { Memoed as SearchConditions };
