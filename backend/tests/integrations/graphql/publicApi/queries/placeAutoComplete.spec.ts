import { setup } from '@tests/utils/setupPublicApi';
import gql from 'graphql-tag';
import { getPlacesAutocompleteResponseResponse } from '@tests/fixtures/googleApi';
import * as googleApiModule from '@/services/api/googleApi';
import { vi } from 'vitest';

vi.spyOn(googleApiModule, 'getPlaceAutoComplete').mockResolvedValue(
  getPlacesAutocompleteResponseResponse,
);

const QUERY = gql`
  query ($searchText: String!) {
    placeAutocomplete(searchText: $searchText) {
      predictions {
        description
        matched_substrings {
          length
          offset
        }
        place_id
        structured_formatting {
          main_text
          main_text_matched_substrings {
            length
            offset
          }
          secondary_text
        }
        terms {
          offset
          value
        }
        reference
        types
      }
      status
      error_message
      info_messages
    }
  }
`;

describe('placeAutoComplete', () => {
  it('returns auto complete', async () => {
    const client = await setup();

    const result = await client.query(QUERY, { variables: { searchText: '' } });

    expect(result.errors).toBeUndefined();
    const placeAutocomplete = result.data['placeAutocomplete'];
    expect(placeAutocomplete.status).toEqual(
      getPlacesAutocompleteResponseResponse.data.status,
    );
    expect(placeAutocomplete.error_message).toEqual(
      getPlacesAutocompleteResponseResponse.data.error_message,
    );
    expect(placeAutocomplete.info_messages).toEqual(
      getPlacesAutocompleteResponseResponse.data.info_messages,
    );

    const prediction = placeAutocomplete.predictions[0];
    const mockPrediction =
      getPlacesAutocompleteResponseResponse.data.predictions[0];
    expect(prediction.description).toEqual(mockPrediction?.description);
    expect(prediction.place_id).toEqual(mockPrediction?.place_id);
    expect(prediction.reference).toEqual(mockPrediction?.reference);
    expect(prediction.matched_substrings[0]).toEqual(
      mockPrediction?.matched_substrings[0],
    );
    expect(prediction.structured_formatting).toEqual(
      mockPrediction?.structured_formatting,
    );
    expect(prediction.terms).toEqual(mockPrediction?.terms);
    expect(prediction.types).toEqual(mockPrediction?.types);
  });
});
