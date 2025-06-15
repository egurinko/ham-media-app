'use client';

import { createListCollection } from '@ark-ui/react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useState, type FC } from 'react';
import { Select, RadioGroup } from '@/app/components/atoms';
import { Button } from '@/app/components/atoms/Button';
import { Icon } from '@/app/components/atoms/Icon';
import { Input } from '@/app/components/atoms/Input';
import { InputLabel } from '@/app/components/atoms/InputLabel';
import AnglesUpDownIcon from '@/assets/angles-up-down.svg';
import CheckIcon from '@/assets/check.svg';
import { css } from '@/styled/css';
import { stack, flex } from '@/styled/patterns';

type Props = {
  makers: { value: string; label: string }[];
  productTags: { value: string; label: string }[];
  internalUsers: { value: string; label: string }[];
};

const PRODUCT_STOCKS = [
  { value: 'has', label: '在庫あり' },
  { value: 'not', label: '在庫なし' },
  { value: 'all', label: 'どちらも' },
];

export const SearchForm: FC<Props> = ({
  makers,
  productTags,
  internalUsers,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [name, setName] = useState(searchParams?.get('name') || '');
  const defaultMakerId = searchParams?.get('makerId') || '';
  const [makerIds, setMakerIds] = useState<string[]>(
    defaultMakerId !== '' ? [defaultMakerId] : [],
  );
  const defaultProductTagId = searchParams?.get('productTagId') || '';
  const [productTagIds, setProductTagIds] = useState<string[]>(
    defaultProductTagId !== '' ? [defaultProductTagId] : [],
  );
  const defaultAllocatedInternalUserId =
    searchParams?.get('allocatedInternalUserId') || '';
  const [allocatedInternalUserIds, setAllocatedInternalUserIds] = useState<
    string[]
  >(
    defaultAllocatedInternalUserId !== ''
      ? [defaultAllocatedInternalUserId]
      : [],
  );
  const defaultChargedInternalUserId =
    searchParams?.get('chargedInternalUserId') || '';
  const [chargedInternalUserIds, setChargedInternalUserIds] = useState<
    string[]
  >(defaultChargedInternalUserId !== '' ? [defaultChargedInternalUserId] : []);
  const defaultHasStock = searchParams?.get('hasStock') || 'has';
  const [productStock, setProductStock] = useState(defaultHasStock);

  const handleSubmit = (): void => {
    if (searchParams) {
      const params = new URLSearchParams(searchParams);
      if (!!name && name !== '') {
        params.set('name', name);
      } else {
        params.delete('name');
      }
      if (makerIds.length !== 0) {
        params.set('makerId', makerIds[0]);
      } else {
        params.delete('makerId');
      }
      if (productTagIds.length !== 0) {
        params.set('productTagId', productTagIds[0]);
      } else {
        params.delete('productTagId');
      }
      if (allocatedInternalUserIds.length !== 0) {
        params.set('allocatedInternalUserId', allocatedInternalUserIds[0]);
      } else {
        params.delete('allocatedInternalUserId');
      }
      if (chargedInternalUserIds.length !== 0) {
        params.set('chargedInternalUserId', chargedInternalUserIds[0]);
      } else {
        params.delete('chargedInternalUserId');
      }
      if (!!productStock && productStock !== '') {
        params.set('hasStock', productStock);
      } else {
        params.delete('hasStock');
      }
      router.replace(`${pathname}?${params.toString()}`);
    }
  };

  const handleClear = () => {
    setName('');
    setMakerIds([]);
    setProductTagIds([]);
    setAllocatedInternalUserIds([]);
    setChargedInternalUserIds([]);
    setProductStock('has');
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
        <div className={stack({ w: { base: '45%', sm: '200px' } })}>
          <InputLabel htmlFor="name">商品名（部分一致）</InputLabel>
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
          collection={createListCollection({ items: makers })}
          onValueChange={(details) => setMakerIds(details.value)}
          value={makerIds}
          name="makerId"
          className={css({ w: { base: '45%', sm: '200px' } })}
        >
          <Select.Label>メーカー</Select.Label>
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder=""></Select.ValueText>
              <Icon source={<AnglesUpDownIcon />} width={10} height={10} />
            </Select.Trigger>
          </Select.Control>
          <Select.Positioner>
            <Select.Content>
              {makers.map((maker) => (
                <Select.Item key={maker.value} item={maker}>
                  <Select.ItemText>{maker.label}</Select.ItemText>
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
          collection={createListCollection({ items: productTags })}
          onValueChange={(e) => setProductTagIds(e.value)}
          value={productTagIds}
          name="productTagId"
          className={css({ w: { base: '45%', sm: '200px' } })}
        >
          <Select.Label>タグ</Select.Label>
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder=""></Select.ValueText>
              <Icon source={<AnglesUpDownIcon />} width={10} height={10} />
            </Select.Trigger>
          </Select.Control>
          <Select.Positioner>
            <Select.Content>
              {productTags.map((productTag) => (
                <Select.Item key={productTag.value} item={productTag}>
                  <Select.ItemText>{productTag.label}</Select.ItemText>
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
          collection={createListCollection({ items: internalUsers })}
          onValueChange={(e) => setAllocatedInternalUserIds(e.value)}
          value={allocatedInternalUserIds}
          name="allocatedInternalUserId"
          className={css({ w: { base: '45%', sm: '200px' } })}
        >
          <Select.Label>在庫割当ユーザ</Select.Label>
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
        <Select.Root
          positioning={{ sameWidth: true }}
          collection={createListCollection({ items: internalUsers })}
          onValueChange={(e) => setChargedInternalUserIds(e.value)}
          value={chargedInternalUserIds}
          name="chargedInternalUserId"
          className={css({ w: { base: '45%', sm: '200px' } })}
        >
          <Select.Label>在庫責任者</Select.Label>
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
        <RadioGroup.Root
          value={productStock}
          onValueChange={(details) => setProductStock(details.value || '')}
          orientation="horizontal"
          size="sm"
        >
          <RadioGroup.Indicator />
          {PRODUCT_STOCKS.map((option) => (
            <RadioGroup.Item key={option.value} value={option.value}>
              <RadioGroup.ItemControl />
              <RadioGroup.ItemText>{option.label}</RadioGroup.ItemText>
              <RadioGroup.ItemHiddenInput />
            </RadioGroup.Item>
          ))}
        </RadioGroup.Root>
      </div>
      <div>
        <Button
          type="button"
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
