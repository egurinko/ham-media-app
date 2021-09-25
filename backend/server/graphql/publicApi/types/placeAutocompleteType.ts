import { objectType } from 'nexus';
import { placeAutocompleteStatusType } from './placeAutocomplete/statusType';
import { placeAutocompletePredictionType } from './placeAutocomplete/predictionType';

const placeAutocompleteType = objectType({
  name: 'PlaceAutocomplete',
  description: 'Google Place Autocomplete api response',
  definition(t) {
    t.nonNull.list.nonNull.field('predictions', {
      type: placeAutocompletePredictionType,
    });
    t.nonNull.field('status', { type: placeAutocompleteStatusType });
    t.string('error_message');
    t.list.nonNull.string('info_messages');
  },
});

export { placeAutocompleteType };
