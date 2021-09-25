import { queryField, nonNull, stringArg } from 'nexus';
import { placeAutocompleteType } from '../types';
import { getPlaceAutoComplete } from '@/services/api/googleApi';

export const placeAutocompletes = queryField((t) => {
  t.nonNull.field('placeAutocomplete', {
    type: placeAutocompleteType,
    args: {
      searchText: nonNull(stringArg()),
    },
    resolve: async (_root, _args, _ctx) => {
      try {
        const result = await getPlaceAutoComplete('sa');
        return result.data;
      } catch (e) {
        console.error('fail google api request', e);
        throw Error('fail google api request');
      }
    },
  });
});
