import { useState, Dispatch, SetStateAction } from 'react';
import { IconButton, Input, Box, Button } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { QueryLazyOptions } from '@apollo/client';
import Card from '@/components/atoms/Card';
import {
  usePublicGetPlaceAutocompleteLazyQuery,
  PublicGetHospitalConnectionQueryVariables,
} from '@/api/public_api/types';

type Props = {
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
  getHospitalConnection: (
    options?: QueryLazyOptions<PublicGetHospitalConnectionQueryVariables>
  ) => void;
};

const TextSearch: React.FC<Props> = ({
  searchText,
  setSearchText,
  getHospitalConnection,
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
    getHospitalConnection({
      variables: {
        first: 10,
        searchText,
        reservable: false,
        nightServiceOption: false,
        insuranceEnabled: false,
        jsavaOption: false,
        nichijuOption: false,
      },
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
                  onClick={() =>
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
        />
      </Box>
    </Card>
  );
};

export default TextSearch;
