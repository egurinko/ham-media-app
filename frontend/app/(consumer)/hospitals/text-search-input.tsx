'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/app/components/atoms/Button';
import { Input } from '@/app/components/atoms/Input';
import { usePublicGetPlaceAutocompleteLazyQuery } from '@/services/api/public_api/types';
import { css } from '@/styled/css';
import type { FC } from 'react';

export const TextSearchInput: FC<NoProps> = () => {
  const [getPlaceAutocomplete, { data }] =
    usePublicGetPlaceAutocompleteLazyQuery();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [text, setText] = useState(
    searchParams?.get('searchText')?.toString() || '',
  );
  const [isCandidatesWindowOpen, setIsCandidatesWindowOpen] = useState(false);

  const handleTextChange = (searchText: string): void => {
    setText(searchText);
    reflectToURLParams(searchText);
    getPlaceAutocomplete({ variables: { searchText } });
  };

  const reflectToURLParams = (searchText: string): void => {
    if (searchParams) {
      const params = new URLSearchParams(searchParams);
      if (searchText) {
        searchParams?.forEach((_, key) => params.delete(key));
        params.set('searchText', searchText);
        getPlaceAutocomplete({ variables: { searchText } });
      } else {
        params.delete('searchText');
      }
      router.replace(`${pathname}?${params.toString()}`);
    }
  };

  const handleAutocompleteClick = (autocomplete: string): void => {
    setText(autocomplete);
    reflectToURLParams(autocomplete);
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
        value={text}
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
