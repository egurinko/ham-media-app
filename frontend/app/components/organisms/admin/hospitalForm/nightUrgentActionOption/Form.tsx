'use client';

import { createListCollection } from '@ark-ui/react';
import { useState, useActionState } from 'react';
import { Select } from '@/app/components/atoms/';
import { Alert } from '@/app/components/atoms/Alert';
import { Icon } from '@/app/components/atoms/Icon';
import { SubmitButton } from '@/app/components/atoms/SubmitButton';
import { Tag } from '@/app/components/atoms/Tag';
import type {
  FormState,
  FormSchema,
} from '@/app/utils/formSchema/hospital/nightUrgentActionOption';
import AnglesUpDownIcon from '@/assets/angles-up-down.svg';
import CheckIcon from '@/assets/check.svg';
import { css } from '@/styled/css';
import { updateHospitalNightUrgentActionOptionAction } from './form.action';
import type { FC } from 'react';

type Props = {
  initialHospitalNightUrgentActionOption: FormSchema;
};

export const Form: FC<Props> = ({ initialHospitalNightUrgentActionOption }) => {
  const initialState: FormState = { message: '', errors: {} };
  const [state, dispatch] = useActionState(
    updateHospitalNightUrgentActionOptionAction,
    initialState,
  );
  const [statuses, setStatuses] = useState([
    initialHospitalNightUrgentActionOption.status,
  ]);

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
        value={String(initialHospitalNightUrgentActionOption.hospitalId)}
      />
      <input type="hidden" name="status" value={statuses[0]} />
      <Select.Root
        positioning={{ sameWidth: true }}
        width="100%"
        collection={createListCollection({ items: statuses })}
        onValueChange={(e) => setStatuses(e.value)}
        value={statuses}
        name="status"
        aria-describedby="status-error"
      >
        <Select.Label>
          緊急夜間対応可否 <Tag>必須</Tag>
        </Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="緊急夜間対応可否を選択してください。"></Select.ValueText>
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
      <SubmitButton text="保存する" />
    </form>
  );
};
