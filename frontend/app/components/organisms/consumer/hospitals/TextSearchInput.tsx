'use client';

import { useState } from 'react';
import { Button } from '@/app/components/atoms/Button';
import { Input } from '@/app/components/atoms/Input';
import { usePublicGetPlaceAutocompleteLazyQuery } from '@/services/api/public_api/types';
import { css } from '@/styled/css';
import type { FC } from 'react';

type Props = {
  searchText: string;
  setSearchText: (searchText: string) => void;
};

export const TextSearchInput: FC<Props> = ({ searchText, setSearchText }) => {
  const [getPlaceAutocomplete, { data }] =
    usePublicGetPlaceAutocompleteLazyQuery();
  const [isCandidatesWindowOpen, setIsCandidatesWindowOpen] = useState(false);

  const handleTextChange = (searchText: string): void => {
    setSearchText(searchText);
    getPlaceAutocomplete({ variables: { searchText } });
  };

  const handleAutocompleteClick = (autocomplete: string): void => {
    setSearchText(autocomplete);
  };

  const handleTextFocus = (): void => {
    setIsCandidatesWindowOpen(true);
  };

  const handleTextBlur = (): void => {
    setIsCandidatesWindowOpen(false);
  };

  return (
    <div className={css({ width: '100%' })}>
      <Input
        value={searchText}
        onChange={(e) => {
          handleTextChange(e.target.value);
        }}
        onFocus={handleTextFocus}
        onBlur={handleTextBlur}
        placeholder="エリア・駅から探す"
        fullWidth={true}
      />
      {isCandidatesWindowOpen &&
      !!data &&
      data.placeAutocomplete.predictions.length !== 0 ? (
        <div
          className={css({
            borderColor: 'outline.main',
            borderWidth: 'thin',
            borderTop: 'none',
            borderBottomRadius: 'sm',
          })}
        >
          {data?.placeAutocomplete.predictions.map((prediction) => (
            <Button
              key={prediction.place_id}
              visual="tonal"
              onMouseDown={() =>
                handleAutocompleteClick(
                  prediction.structured_formatting.main_text,
                )
              }
              className={css({
                m: 'sm',
              })}
            >
              {prediction.structured_formatting.main_text}
            </Button>
          ))}
        </div>
      ) : null}
    </div>
  );
};
