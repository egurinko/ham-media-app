import { useState, Dispatch, SetStateAction } from 'react';
import { IconButton, Input, Box, Button } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import Card from '@/components/atoms/Card';
import {
  usePublicGetPlaceAutocompleteLazyQuery,
  PublicGetHospitalConnectionQueryVariables,
} from '@/api/public_api/types';

type Props = {
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
  getInitialHospitalConnection: (
    variables: Partial<PublicGetHospitalConnectionQueryVariables>
  ) => void;
};

const TextSearch: React.FC<Props> = ({
  searchText,
  setSearchText,
  getInitialHospitalConnection,
}) => {
  const [isCandidatesWindowOpen, setIsCandidatesWindowOpen] = useState(false);
  const [getPlaceAutocomplete, { data }] =
    usePublicGetPlaceAutocompleteLazyQuery();

  const handleSearchTextChange = (e: GenericChangeEvent<string>): void => {
    setSearchText(e.target.value);
    getPlaceAutocomplete({ variables: { searchText: e.target.value } });
  };

  const handleSearchTextFocus = (): void => {
    setIsCandidatesWindowOpen(true);
  };

  const handleSearchTextBlur = (): void => {
    setIsCandidatesWindowOpen(false);
  };

  const handleAutocompleteClick = (autocomplete: string): void => {
    setSearchText(autocomplete);
  };

  const handleSearchClick = () => {
    getInitialHospitalConnection({
      searchText,
      currentLocation: null,
    });
  };

  return (
    <Card>
      <Box display="flex">
        <Box width="full">
          <Input
            value={searchText}
            onChange={handleSearchTextChange}
            onFocus={handleSearchTextFocus}
            onBlur={handleSearchTextBlur}
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
          disabled={searchText.length === 0}
        />
      </Box>
    </Card>
  );
};

export default TextSearch;
