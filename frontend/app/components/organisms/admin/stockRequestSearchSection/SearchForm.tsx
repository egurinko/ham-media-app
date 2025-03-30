'use client';

import { createListCollection } from '@ark-ui/react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useState, type FC } from 'react';
import { Select } from '@/app/components/atoms';
import { Button } from '@/app/components/atoms/Button';
import { Icon } from '@/app/components/atoms/Icon';
import AnglesUpDownIcon from '@/assets/angles-up-down.svg';
import CheckIcon from '@/assets/check.svg';
import { css } from '@/styled/css';
import { flex } from '@/styled/patterns';

type Props = {
  internalUsers: { value: string; label: string }[];
};

export const SearchForm: FC<Props> = ({ internalUsers }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const defaultInternalUserId = searchParams?.get('internalUserId') || '';
  const [internalUserIds, setInternalUserIds] = useState<string[]>(
    defaultInternalUserId !== '' ? [defaultInternalUserId] : [],
  );

  const handleSubmit = (): void => {
    if (searchParams) {
      const params = new URLSearchParams(searchParams);
      if (internalUserIds.length !== 0) {
        params.set('internalUserId', internalUserIds[0]);
      } else {
        params.delete('internalUserId');
      }
      router.replace(`${pathname}?${params.toString()}`);
    }
  };

  const handleClear = () => {
    setInternalUserIds([]);
    handleSubmit();
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
        <Select.Root
          positioning={{ sameWidth: true }}
          collection={createListCollection({ items: internalUsers })}
          onValueChange={(details) => setInternalUserIds(details.value)}
          value={internalUserIds}
          name="internalUserId"
          className={css({ w: { base: '45%', sm: '200px' } })}
        >
          <Select.Label>リクエストユーザ</Select.Label>
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder=""></Select.ValueText>
              <Icon source={<AnglesUpDownIcon />} width={10} height={10} />
            </Select.Trigger>
          </Select.Control>
          <Select.Positioner>
            <Select.Content>
              {internalUsers.map((internalUser) => (
                <Select.Item key={internalUser.value} item={internalUser}>
                  <Select.ItemText>{internalUser.label}</Select.ItemText>
                  <Select.ItemIndicator>
                    <Icon source={<CheckIcon />} width={15} height={15} />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Select.Root>
      </div>
      <div>
        <Button
          visual="outlined"
          onClick={handleClear}
          className={flex({
            width: '100px',
            mr: 'lg',
          })}
        >
          クリア
        </Button>
        <Button
          type="submit"
          visual="tonal"
          className={flex({
            width: '100px',
          })}
        >
          検索
        </Button>
      </div>
    </form>
  );
};
