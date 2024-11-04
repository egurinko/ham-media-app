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
} from '@/app/utils/formSchema/hospital/certificationOption';
import AnglesUpDownIcon from '@/assets/angles-up-down.svg';
import CheckIcon from '@/assets/check.svg';
import { css } from '@/styled/css';
import { updateHospitalCertificationOptionAction } from './form.action';
import type { FC } from 'react';

type Props = {
  initialHospitalCertificationOption: FormSchema;
};

export const Form: FC<Props> = ({ initialHospitalCertificationOption }) => {
  const initialState: FormState = { message: '', errors: {} };
  const [state, dispatch] = useActionState(
    updateHospitalCertificationOptionAction,
    initialState,
  );
  const [jsavaRegistereds, setJsavaRegistereds] = useState([
    initialHospitalCertificationOption.jsavaRegistered,
  ]);
  const [nichijuRegistereds, setNichijuRegistereds] = useState([
    initialHospitalCertificationOption.nichijuRegistered,
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
        value={String(initialHospitalCertificationOption.hospitalId)}
      />
      <input type="hidden" name="jsavaRegistered" value={jsavaRegistereds[0]} />
      <Select.Root
        positioning={{ sameWidth: true }}
        width="100%"
        collection={createListCollection({ items: jsavaRegistereds })}
        onValueChange={(e) => setJsavaRegistereds(e.value)}
        value={jsavaRegistereds}
        name="jsava-registered"
        aria-describedby="jsava-registered-error"
      >
        <Select.Label>
          日本小動物獣医師会(JSAVA)認定状況 <Tag>必須</Tag>
        </Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="日本小動物獣医師会(JSAVA)認定状況を選択してください。"></Select.ValueText>
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

      <input
        type="hidden"
        name="nichijuRegistered"
        value={nichijuRegistereds[0]}
      />
      <Select.Root
        positioning={{ sameWidth: true }}
        width="100%"
        collection={createListCollection({ items: nichijuRegistereds })}
        onValueChange={(e) => setNichijuRegistereds(e.value)}
        value={nichijuRegistereds}
        name="nichiju-registered"
        aria-describedby="nichiju-registered-error"
      >
        <Select.Label>
          日本獣医師会認定状況 <Tag>必須</Tag>
        </Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="日本獣医師会認定状況を選択してください。"></Select.ValueText>
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
