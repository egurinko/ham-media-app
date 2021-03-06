import { CloseIcon } from '@chakra-ui/icons';
import { Text, Flex, Button } from '@chakra-ui/react';
import { useCallback, memo, useMemo } from 'react';
import { useLocalGetHospitalSearchQuery } from '@/api/local_api/types';
import { SecondaryButton } from '@/components/atoms/SecondaryButton';
import { hospitalSearchVar } from '@/utils/apollo/cache';
import type { FC } from 'react';

const SearchConditions: FC<NoProps> = () => {
  const { data } = useLocalGetHospitalSearchQuery();
  const hospitalSearch = useMemo(() => data?.hospitalSearch, [data]);
  const clearAll = useCallback(() => {
    hospitalSearchVar({
      searchText: '',
      currentLocation: null,
      reservable: false,
      nightServiceOption: false,
      insuranceEnabled: false,
      jsavaOption: false,
      nichijuOption: false,
      recommended: false,
    });
  }, []);

  const clearReservable = useCallback(() => {
    hospitalSearchVar({
      ...hospitalSearchVar(),
      reservable: false,
    });
  }, []);

  const clearNightServiceOption = useCallback(() => {
    hospitalSearchVar({
      ...hospitalSearchVar(),
      nightServiceOption: false,
    });
  }, []);

  const clearInsuranceEnabled = useCallback(() => {
    hospitalSearchVar({
      ...hospitalSearchVar(),
      insuranceEnabled: false,
    });
  }, []);

  const clearJsavaOption = useCallback(() => {
    hospitalSearchVar({
      ...hospitalSearchVar(),
      jsavaOption: false,
    });
  }, []);

  const clearNichijuOption = useCallback(() => {
    hospitalSearchVar({
      ...hospitalSearchVar(),
      nichijuOption: false,
    });
  }, []);

  const clearRecommended = useCallback(() => {
    hospitalSearchVar({
      ...hospitalSearchVar(),
      recommended: false,
    });
  }, []);

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
        <Text fontSize="sm">??????????????????</Text>
      </Button>

      {!hospitalSearch?.reservable || (
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
          <Text fontSize="sm">?????????</Text>
        </SecondaryButton>
      )}
      {!hospitalSearch?.nightServiceOption || (
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
          <Text fontSize="sm">????????????</Text>
        </SecondaryButton>
      )}
      {!hospitalSearch?.insuranceEnabled || (
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
          <Text fontSize="sm">???????????????</Text>
        </SecondaryButton>
      )}
      {!hospitalSearch?.jsavaOption || (
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
          <Text fontSize="sm">??????????????????????????? (JSAVA) ????????????</Text>
        </SecondaryButton>
      )}
      {!hospitalSearch?.nichijuOption || (
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
          <Text fontSize="sm">??????????????????????????????</Text>
        </SecondaryButton>
      )}
      {!hospitalSearch?.recommended || (
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
          <Text fontSize="sm">????????????</Text>
        </SecondaryButton>
      )}
    </Flex>
  );
};

const Memoed = memo(SearchConditions);

export { Memoed as SearchConditions };
