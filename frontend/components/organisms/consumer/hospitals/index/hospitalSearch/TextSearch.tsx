import { SearchIcon } from '@chakra-ui/icons';
import { IconButton, Input, Box, Button } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { usePublicGetPlaceAutocompleteLazyQuery } from '@/api/public_api/types';
import { Card } from '@/components/atoms/Card';
import type { SetSearchText, SetCurrentLocation } from '../types';

type Props = {
  setSearchText: SetSearchText;
  setCurrentLocation: SetCurrentLocation;
};

const TextSearch: React.FC<Props> = ({ setSearchText, setCurrentLocation }) => {
  const [text, setText] = useState('');
  const [isCandidatesWindowOpen, setIsCandidatesWindowOpen] = useState(false);
  const [getPlaceAutocomplete, { data }] =
    usePublicGetPlaceAutocompleteLazyQuery();

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
    setSearchText(text);
    setCurrentLocation(null);
  }, [text, setSearchText, setCurrentLocation]);

  return (
    <Card>
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
    </Card>
  );
};

export { TextSearch };
