type PlacesAutocompleteResponse = {
  predictions: Prediction[];
  status: Status;
  error_message?: string;
  info_messages?: string[];
};

type Prediction = {
  description: string;
  matched_substrings: MatchedSubstring[];
  place_id: string;
  structured_formatting: StructuredFormatting;
  terms: Term[];
  types: string[];
  reference: string;
};

type MatchedSubstring = {
  length: number;
  offset: number;
};

type StructuredFormatting = {
  main_text: string;
  main_text_matched_substrings: MatchedSubstring[];
  secondary_text: string;
};

type Term = {
  offset: number;
  value: string;
};

const STATUS = {
  OK: 'OK',
  ZERO_RESULTS: 'ZERO_RESULTS',
  INVALID_REQUEST: 'INVALID_REQUEST',
  OVER_QUERY_LIMIT: 'OVER_QUERY_LIMIT',
  REQUEST_DENIED: 'REQUEST_DENIED',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
} as const;

type Status = typeof STATUS[keyof typeof STATUS];

export { STATUS };
export type { PlacesAutocompleteResponse };
