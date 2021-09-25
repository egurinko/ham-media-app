import axios, { AxiosResponse } from 'axios';
import type { PlacesAutocompleteResponse } from './types';

const GOOGLE_API_KEY = process.env['GOOGLE_API_KEY'];

const instance = axios.create({
  baseURL: 'https://maps.googleapis.com',
});

// TODO: Use Seesion Key
const getPlaceAutoComplete = (
  searchText: string
): Promise<AxiosResponse<PlacesAutocompleteResponse>> =>
  instance.get<PlacesAutocompleteResponse>(
    '/maps/api/place/autocomplete/json',
    {
      params: {
        input: searchText,
        key: GOOGLE_API_KEY,
        language: 'ja',
        types: 'geocode',
        components: 'country:jp',
      },
    }
  );

export { getPlaceAutoComplete };
