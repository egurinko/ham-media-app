import { gql } from '@apollo/client';

export const getPlaceAutocomplete = gql`
  query PublicGetPlaceAutocomplete($searchText: String!) {
    placeAutocomplete(searchText: $searchText) {
      predictions {
        place_id
        structured_formatting {
          main_text
        }
      }
    }
  }
`;
