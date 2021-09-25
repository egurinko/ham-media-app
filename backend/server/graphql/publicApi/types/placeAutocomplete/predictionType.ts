import { objectType } from 'nexus';

export const placeAutocompletePredictionType = objectType({
  name: 'PlaceAutocompletePrediction',
  description: 'Google Place Autocomplete api response prediction',
  definition(t) {
    t.nonNull.string('description');
    t.nonNull.list.nonNull.field('matched_substrings', {
      type: placeAutocompletePredictionMatchedSubstringType,
    });
    t.nonNull.string('place_id');
    t.nonNull.field('structured_formatting', {
      type: placeAutocompletePredictionStructuredFormattingType,
    });
    t.nonNull.list.nonNull.field('terms', {
      type: placeAutocompletePredictionTermType,
    });
    t.nonNull.string('reference');
    t.nonNull.list.nonNull.string('types');
  },
});

export const placeAutocompletePredictionMatchedSubstringType = objectType({
  name: 'PlaceAutocompletePredictionMatchedSubstring',
  description:
    'Google Place Autocomplete api response prediction matched substring',
  definition(t) {
    t.nonNull.int('length');
    t.nonNull.int('offset');
  },
});

export const placeAutocompletePredictionStructuredFormattingType = objectType({
  name: 'PlaceAutocompletePredictionStructuredFormatting',
  description:
    'Google Place Autocomplete api response prediction structured formatting',
  definition(t) {
    t.nonNull.string('main_text');
    t.nonNull.list.nonNull.field('main_text_matched_substrings', {
      type: placeAutocompletePredictionMatchedSubstringType,
    });
    t.nonNull.string('secondary_text');
  },
});

export const placeAutocompletePredictionTermType = objectType({
  name: 'PlaceAutocompletePredictionTerm',
  description: 'Google Place Autocomplete api response prediction term',
  definition(t) {
    t.nonNull.int('offset');
    t.nonNull.string('value');
  },
});
