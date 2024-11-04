'use client';

import { createListCollection } from '@ark-ui/react';
import { useState, useActionState } from 'react';
import { Select } from '@/app/components/atoms';
import { Alert } from '@/app/components/atoms/Alert';
import { Icon } from '@/app/components/atoms/Icon';
import { Input } from '@/app/components/atoms/Input';
import { InputLabel } from '@/app/components/atoms/InputLabel';
import { SubmitButton } from '@/app/components/atoms/SubmitButton';
import { Tag } from '@/app/components/atoms/Tag';
import { ErrorMessages } from '@/app/components/molecules/ErrorMessages';
import { updateHospitalAddressAction } from '@/app/components/organisms/admin/hospitalForm/address/form.action';
import type {
  FormState,
  FormSchema,
} from '@/app/utils/formSchema/hospital/address';
import AnglesUpDownIcon from '@/assets/angles-up-down.svg';
import CheckIcon from '@/assets/check.svg';
import { css } from '@/styled/css';
import { stack } from '@/styled/patterns';
import type { FC } from 'react';

type Props = {
  prefectures: { value: string; label: string }[];
  initialHospitalAddress: FormSchema;
};

export const Form: FC<Props> = ({ prefectures, initialHospitalAddress }) => {
  const initialState: FormState = { message: '', errors: {} };
  const [state, dispatch] = useActionState(
    updateHospitalAddressAction,
    initialState,
  );
  const [prefectureIds, setPrefectureIds] = useState<string[]>([
    String(initialHospitalAddress.prefectureId),
  ]);
  const [address, setAddress] = useState(initialHospitalAddress.address);
  const [phoneNumber, setPhoneNumber] = useState(
    initialHospitalAddress.phoneNumber,
  );

  return (
    <form
      className={css({
        display: 'flex',
        flexDir: 'column',
        gap: 'lg',
        width: '100%',
      })}
      action={dispatch}
    >
      {state.message && <Alert visual="error">{state.message}</Alert>}
      <input
        type="hidden"
        name="hospitalId"
        value={initialHospitalAddress.hospitalId}
      />
      <input type="hidden" name="prefectureId" value={prefectureIds[0]} />
      <Select.Root
        positioning={{ sameWidth: true }}
        width="100%"
        collection={createListCollection({
          items: prefectures,
        })}
        onValueChange={(e) => setPrefectureIds(e.value)}
        value={prefectureIds}
        name="prefectureId"
        aria-describedby="prefecture-error"
      >
        <Select.Label>
          都道府県 <Tag>必須</Tag>
        </Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="都道府県を選択してください。"></Select.ValueText>
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
      <div id="prefecture-error" aria-live="polite" aria-atomic="true">
        {state.errors?.prefectureId && (
          <ErrorMessages messages={state.errors.prefectureId} />
        )}
      </div>
      <div className={stack()}>
        <InputLabel htmlFor="address">
          住所（都道府県以降） <Tag>必須</Tag>
        </InputLabel>
        <Input
          id="address"
          name="address"
          required={true}
          fullWidth
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          aria-describedby="address-error"
        />
        <div id="address-error" aria-live="polite" aria-atomic="true">
          {state.errors?.address && (
            <ErrorMessages messages={state.errors.address} />
          )}
        </div>
      </div>
      <div className={stack()}>
        <InputLabel htmlFor="phoneNumber">電話番号</InputLabel>
        <Input
          id="phoneNumber"
          name="phoneNumber"
          type="tel"
          required={false}
          fullWidth
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          aria-describedby="phoneNumber-error"
        />
        <div id="phoneNumber-error" aria-live="polite" aria-atomic="true">
          {state.errors?.phoneNumber && (
            <ErrorMessages messages={state.errors.phoneNumber} />
          )}
        </div>
      </div>
      <SubmitButton text="更新する" />
    </form>
  );
};
