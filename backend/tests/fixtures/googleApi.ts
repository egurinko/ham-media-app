import type { AxiosResponse, AxiosRequestConfig } from 'axios';
import type {
  GeocodeResponse,
  PlacesAutocompleteResponse,
} from '@/services/api/googleApi/types';

export const getPlacesAutocompleteResponseResponse: AxiosResponse<PlacesAutocompleteResponse> =
  {
    status: 200,
    statusText: 'Success',
    headers: {},
    config: {} as AxiosRequestConfig,
    data: {
      predictions: [
        {
          description: 'description',
          matched_substrings: [
            {
              length: 50,
              offset: 50,
            },
          ],
          place_id: 'place_id',
          structured_formatting: {
            main_text: 'main_text',
            main_text_matched_substrings: [
              {
                length: 50,
                offset: 50,
              },
            ],
            secondary_text: 'secondary_text',
          },
          terms: [
            {
              offset: 50,
              value: 'value',
            },
          ],
          types: [],
          reference: 'reference',
        },
      ],
      status: 'OK',
      error_message: 'error_message',
      info_messages: [],
    },
  };

export const getGeoLocationMockResponse: AxiosResponse<GeocodeResponse> = {
  status: 200,
  statusText: 'Success',
  headers: {},
  config: {} as AxiosRequestConfig,
  data: {
    status: 'OK',
    results: [
      {
        address_components: [
          {
            long_name: 'long_name',
            short_name: 'short_name',
            types: [],
          },
        ],
        formatted_address: 'formatted_address',
        geometry: {
          location: {
            lat: 50,
            lng: 50,
          },
          location_type: 'location_type',
          viewport: {
            northeast: {
              lat: 50,
              lng: 50,
            },
            southwest: {
              lat: 50,
              lng: 50,
            },
          },
        },
        place_id: 'place_id',
        plus_code: {
          compound_code: 'compound_code',
          global_code: 'global_code',
        },
        types: [],
      },
    ],
  },
};
