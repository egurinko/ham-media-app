'use client';

import { createListCollection } from '@ark-ui/react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useState, type FC } from 'react';
import { Select } from '@/app/components/atoms';
import { Button } from '@/app/components/atoms/Button';
import { Icon } from '@/app/components/atoms/Icon';
import { Input } from '@/app/components/atoms/Input';
import { InputLabel } from '@/app/components/atoms/InputLabel';
import { Switch } from '@/app/components/atoms/Switch';
import AnglesUpDownIcon from '@/assets/angles-up-down.svg';
import CheckIcon from '@/assets/check.svg';
import { css } from '@/styled/css';
import { stack, flex } from '@/styled/patterns';

type Props = {
  prefectures: { value: string; label: string }[];
};

const STARS = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
];

export const SearchForm: FC<Props> = ({ prefectures }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [name, setName] = useState(searchParams?.get('name') || '');
  const defaultPrefectureId = searchParams?.get('prefectureId') || '';
  const [prefectureIds, setPrefectureIds] = useState<string[]>(
    defaultPrefectureId !== '' ? [defaultPrefectureId] : [],
  );
  const defaultStar = searchParams?.get('star') || '';
  const [star, setStar] = useState<string[]>(
    defaultStar !== '' ? [defaultStar] : [],
  );
  const [published, setPublished] = useState(
    searchParams?.get('published') === 'false' ? false : true,
  );

  const handleSubmit = (): void => {
    if (searchParams) {
      const params = new URLSearchParams(searchParams);
      if (!!name && name !== '') {
        params.set('name', name);
      } else {
        params.delete('name');
      }
      if (prefectureIds.length !== 0) {
        params.set('prefectureId', prefectureIds[0]);
      } else {
        params.delete('prefectureId');
      }
      if (star.length !== 0) {
        params.set('star', star[0]);
      } else {
        params.delete('star');
      }
      params.set('published', String(published));
      router.replace(`${pathname}?${params.toString()}`);
    }
  };

  return (
    <form
      className={flex({
        width: '100%',
        flexDir: 'column',
        gap: 'lg',
        alignItems: 'center',
      })}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div
        className={flex({
          width: '100%',
          flexDir: 'row',
          flexWrap: 'wrap',
          gap: 'md',
          alignItems: 'end',
        })}
      >
        <div className={stack({ w: { base: '45%', sm: '200px' } })}>
          <InputLabel htmlFor="name">病院名（部分一致）</InputLabel>
          <Input
            id="name"
            name="name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <Select.Root
          positioning={{ sameWidth: true }}
          collection={createListCollection({ items: prefectures })}
          onValueChange={(details) => setPrefectureIds(details.value)}
          value={prefectureIds}
          name="prefectureId"
          className={css({ w: { base: '45%', sm: '200px' } })}
        >
          <Select.Label>都道府県</Select.Label>
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder=""></Select.ValueText>
              <Icon source={<AnglesUpDownIcon />} width={10} height={10} />
            </Select.Trigger>
          </Select.Control>
          <Select.Positioner>
            <Select.Content>
              {prefectures.map((prefecture) => (
                <Select.Item key={prefecture.value} item={prefecture}>
                  <Select.ItemText>{prefecture.label}</Select.ItemText>
                  <Select.ItemIndicator>
                    <Icon source={<CheckIcon />} width={15} height={15} />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Select.Root>
        <Select.Root
          positioning={{ sameWidth: true }}
          collection={createListCollection({ items: STARS })}
          onValueChange={(e) => setStar(e.value)}
          value={star}
          name="star"
          className={css({ w: { base: '45%', sm: '200px' } })}
        >
          <Select.Label>星（⭐︎）</Select.Label>
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder=""></Select.ValueText>
              <Icon source={<AnglesUpDownIcon />} width={10} height={10} />
            </Select.Trigger>
          </Select.Control>
          <Select.Positioner>
            <Select.Content>
              {STARS.map((star) => (
                <Select.Item key={star.value} item={star}>
                  <Select.ItemText>{star.label}</Select.ItemText>
                  <Select.ItemIndicator>
                    <Icon source={<CheckIcon />} width={15} height={15} />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Select.Root>
        <div className={stack()}>
          <Switch
            id="published"
            name="published"
            checked={published}
            onCheckedChange={(e) => setPublished(e.checked)}
          >
            公開状態
          </Switch>
        </div>
      </div>
      <Button
        type="submit"
        visual="tonal"
        className={flex({
          width: '100px',
        })}
      >
        検索
      </Button>
    </form>
  );
};
