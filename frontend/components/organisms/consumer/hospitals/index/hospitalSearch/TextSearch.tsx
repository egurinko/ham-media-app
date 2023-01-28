import { SearchIcon } from '@chakra-ui/icons';
import { IconButton, Input, Box, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState, memo } from 'react';
import { useLocalGetHospitalSearchQuery } from '@/services/api/local_api/types';
import { usePublicGetPlaceAutocompleteLazyQuery } from '@/services/api/public_api/types';
import { hospitalSearchVar } from '@/utils/apollo/cache';
import { LOCAL_STORAGE_HOSPITAL_SEARCH_KEY } from '@/utils/constant';
import { useLocalStorage } from '@/utils/hooks';
import { goHospitalsResult } from '@/utils/routes';
import type { PERSISTED } from '../../types';
import type { FC } from 'react';

const TextSearch: FC<NoProps> = () => {
  const { setLocalStorage } = useLocalStorage<PERSISTED>(
    LOCAL_STORAGE_HOSPITAL_SEARCH_KEY
  );

  const router = useRouter();
  const [text, setText] = useState('');
  const [isCandidatesWindowOpen, setIsCandidatesWindowOpen] = useState(false);
  const [getPlaceAutocomplete, { data }] =
    usePublicGetPlaceAutocompleteLazyQuery();
  const { data: hospitalSearchData } = useLocalGetHospitalSearchQuery();

  const copyApplied = useCallback(() => {
    if (hospitalSearchData?.hospitalSearch.searchText) {
      setText(hospitalSearchData?.hospitalSearch.searchText);
    }
  }, [hospitalSearchData]);

  const copyLocal = useCallback(async () => {
    hospitalSearchVar({
      ...hospitalSearchVar(),
      searchText: text,
      currentLocation: null,
    });
    setLocalStorage({
      searchText: text,
      currentLocation: null,
      reservable: false,
      nightServiceOption: false,
      insuranceEnabled: false,
      jsavaOption: false,
      nichijuOption: false,
      recommended: false,
    });
  }, [text, setLocalStorage]);

  useEffect(() => {
    copyApplied();
  }, [copyApplied]);

  const handleTextChange = useCallback(
    (e: GenericChangeEvent<string>): void => {
      setText(e.target.value);
      getPlaceAutocomplete({ variables: { searchText: e.target.value } });
    },
    [getPlaceAutocomplete]
  );

  const handleTextFocus = useCallback((): void => {
    setIsCandidatesWindowOpen(true);
  }, []);

  const handleTextBlur = useCallback((): void => {
    setIsCandidatesWindowOpen(false);
  }, []);

  const handleAutocompleteClick = useCallback((autocomplete: string): void => {
    setText(autocomplete);
  }, []);

  const handleSearchClick = useCallback(() => {
    copyLocal();
    goHospitalsResult(router);
  }, [copyLocal, router]);

  return (
    <Box display="flex">
      <Box width="full">
        <Input
          value={text}
          onChange={handleTextChange}
          onFocus={handleTextFocus}
          onBlur={handleTextBlur}
          borderRightRadius={0}
          placeholder="エリア・駅から探す"
        />
        {isCandidatesWindowOpen &&
        !!data &&
        data.placeAutocomplete.predictions.length !== 0 ? (
          <Box
            border="1px"
            borderColor="gray.200"
            borderTop="none"
            borderBottomRadius={5}
          >
            {data?.placeAutocomplete.predictions.map((prediction) => (
              <Button
                key={prediction.place_id}
                m="2"
                onMouseDown={() =>
                  handleAutocompleteClick(
                    prediction.structured_formatting.main_text
                  )
                }
              >
                {prediction.structured_formatting.main_text}
              </Button>
            ))}
          </Box>
        ) : null}
      </Box>
      <IconButton
        aria-label="link"
        variant="solid"
        colorScheme="primary"
        onClick={handleSearchClick}
        icon={<SearchIcon />}
        borderLeftRadius={0}
        disabled={text.length === 0}
      />
    </Box>
  );
};

const Memoed = memo(TextSearch);

export { Memoed as TextSearch };
