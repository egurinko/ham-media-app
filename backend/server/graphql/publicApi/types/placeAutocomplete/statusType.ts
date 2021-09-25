import { enumType } from 'nexus';
import { STATUS } from '@/services/api/googleApi/types';

export const placeAutocompleteStatusType = enumType({
  name: 'PlaceAutocompleteStatus',
  description: 'Google Place Autocomplete api response status',
  members: Object.values(STATUS),
});
