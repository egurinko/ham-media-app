'use client';

import { createListCollection } from '@ark-ui/react';
import { useState, useActionState } from 'react';
import { Select } from '@/app/components/atoms/';
import { Alert } from '@/app/components/atoms/Alert';
import { Icon } from '@/app/components/atoms/Icon';
import { Input } from '@/app/components/atoms/Input';
import { InputLabel } from '@/app/components/atoms/InputLabel';
import { SubmitButton } from '@/app/components/atoms/SubmitButton';
import { Tag } from '@/app/components/atoms/Tag';
import { ErrorMessages } from '@/app/components/molecules/ErrorMessages';
import type {
  FormState,
  FormSchema,
} from '@/app/utils/formSchema/hospital/reservationStatus';
import AnglesUpDownIcon from '@/assets/angles-up-down.svg';
import CheckIcon from '@/assets/check.svg';
import { css } from '@/styled/css';
import { stack } from '@/styled/patterns';
import { updateHospitalReservationStatusAction } from './form.action';
import type { FC } from 'react';

type Props = {
  initialHospitalReservationStatus: FormSchema;
};

export const Form: FC<Props> = ({ initialHospitalReservationStatus }) => {
  const initialState: FormState = { message: '', errors: {} };
  const [state, dispatch] = useActionState(
    updateHospitalReservationStatusAction,
    initialState,
  );
  const [requireds, setRequireds] = useState([
    initialHospitalReservationStatus.required,
  ]);
  const [reservables, setReservables] = useState([
    initialHospitalReservationStatus.reservable,
  ]);
  const [remark, setRemark] = useState(initialHospitalReservationStatus.remark);

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
        value={String(initialHospitalReservationStatus.hospitalId)}
      />
      <input type="hidden" name="required" value={requireds[0]} />
      <Select.Root
        positioning={{ sameWidth: true }}
        width="100%"
        collection={createListCollection({ items: requireds })}
        onValueChange={(e) => setRequireds(e.value)}
        value={requireds}
        name="required"
        aria-describedby="required-error"
      >
        <Select.Label>
          予約要否 <Tag>必須</Tag>
        </Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="予約要否を選択してください。"></Select.ValueText>
            <Icon source={<AnglesUpDownIcon />} width={10} height={10} />
          </Select.Trigger>
        </Select.Control>
        <Select.Positioner>
          <Select.Content>
            <Select.Item item="○">
              <Select.ItemText>○</Select.ItemText>
              <Select.ItemIndicator>
                <Icon source={<CheckIcon />} width={15} height={15} />
              </Select.ItemIndicator>
            </Select.Item>
            <Select.Item item="×">
              <Select.ItemText>×</Select.ItemText>
              <Select.ItemIndicator>
                <Icon source={<CheckIcon />} width={15} height={15} />
              </Select.ItemIndicator>
            </Select.Item>
            <Select.Item item="不明">
              <Select.ItemText>不明</Select.ItemText>
              <Select.ItemIndicator>
                <Icon source={<CheckIcon />} width={15} height={15} />
              </Select.ItemIndicator>
            </Select.Item>
          </Select.Content>
        </Select.Positioner>
      </Select.Root>
      <input type="hidden" name="reservable" value={reservables[0]} />
      <Select.Root
        positioning={{ sameWidth: true }}
        width="100%"
        collection={createListCollection({ items: reservables })}
        onValueChange={(e) => setReservables(e.value)}
        value={reservables}
        name="reservable"
        aria-describedby="reservable-error"
      >
        <Select.Label>
          予約可否 <Tag>必須</Tag>
        </Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="予約可否を選択してください。"></Select.ValueText>
            <Icon source={<AnglesUpDownIcon />} width={10} height={10} />
          </Select.Trigger>
        </Select.Control>
        <Select.Positioner>
          <Select.Content>
            <Select.Item item="○">
              <Select.ItemText>○</Select.ItemText>
              <Select.ItemIndicator>
                <Icon source={<CheckIcon />} width={15} height={15} />
              </Select.ItemIndicator>
            </Select.Item>
            <Select.Item item="×">
              <Select.ItemText>×</Select.ItemText>
              <Select.ItemIndicator>
                <Icon source={<CheckIcon />} width={15} height={15} />
              </Select.ItemIndicator>
            </Select.Item>
            <Select.Item item="不明">
              <Select.ItemText>不明</Select.ItemText>
              <Select.ItemIndicator>
                <Icon source={<CheckIcon />} width={15} height={15} />
              </Select.ItemIndicator>
            </Select.Item>
          </Select.Content>
        </Select.Positioner>
      </Select.Root>
      <div className={stack()}>
        <InputLabel htmlFor="remark">備考</InputLabel>
        <Input
          id="remark"
          name="remark"
          required={false}
          fullWidth
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          aria-describedby="remark-error"
        />
        <div id="remark-error" aria-live="polite" aria-atomic="true">
          {state.errors?.remark && (
            <ErrorMessages messages={state.errors.remark} />
          )}
        </div>
      </div>
      <SubmitButton text="保存する" />
    </form>
  );
};
