'use client';

import { createListCollection } from '@ark-ui/react';
import { useState, useActionState } from 'react';
import { Select } from '@/app/components/atoms/';
import { Alert } from '@/app/components/atoms/Alert';
import { Icon } from '@/app/components/atoms/Icon';
import { InputLabel } from '@/app/components/atoms/InputLabel';
import { SubmitButton } from '@/app/components/atoms/SubmitButton';
import { Tag } from '@/app/components/atoms/Tag';
import { Textarea } from '@/app/components/atoms/Textarea';
import { ErrorMessages } from '@/app/components/molecules/ErrorMessages';
import type {
  FormState,
  FormSchema,
} from '@/app/utils/formSchema/hospital/businessForm';
import AnglesUpDownIcon from '@/assets/angles-up-down.svg';
import CheckIcon from '@/assets/check.svg';
import { css } from '@/styled/css';
import { stack } from '@/styled/patterns';
import { updateHospitalBusinessFormAction } from './form.action';
import type { FC } from 'react';

type Props = {
  initialHospitalBusinessForm: FormSchema;
};

export const Form: FC<Props> = ({ initialHospitalBusinessForm }) => {
  const initialState: FormState = { message: '', errors: {} };
  const [state, dispatch] = useActionState(
    updateHospitalBusinessFormAction,
    initialState,
  );
  const [businessHour, setBusinessHour] = useState(
    initialHospitalBusinessForm.businessHour,
  );
  const [closedDay, setClosedDay] = useState(
    initialHospitalBusinessForm.closedDay,
  );
  const [insuranceEnableds, setInsuranceEnableds] = useState([
    initialHospitalBusinessForm.insuranceEnabled,
  ]);
  const [remark, setRemark] = useState(initialHospitalBusinessForm.remark);

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
        value={String(initialHospitalBusinessForm.hospitalId)}
      />
      <div className={stack()}>
        <InputLabel htmlFor="businessHour">
          診療時間 <Tag>必須</Tag>
        </InputLabel>
        <Textarea
          id="businessHour"
          name="businessHour"
          required={true}
          value={businessHour}
          onChange={(e) => setBusinessHour(e.target.value)}
          aria-describedby="businessHour-error"
          rows={5}
        />
        <div id="businessHour-error" aria-live="polite" aria-atomic="true">
          {state.errors?.businessHour && (
            <ErrorMessages messages={state.errors.businessHour} />
          )}
        </div>
      </div>
      <div className={stack()}>
        <InputLabel htmlFor="closedDay">休診日</InputLabel>
        <Textarea
          id="closedDay"
          name="closedDay"
          required={false}
          value={closedDay}
          onChange={(e) => setClosedDay(e.target.value)}
          aria-describedby="closedDay-error"
          rows={5}
        />
        <div id="closedDay-error" aria-live="polite" aria-atomic="true">
          {state.errors?.closedDay && (
            <ErrorMessages messages={state.errors.closedDay} />
          )}
        </div>
      </div>
      <div className={stack()}>
        <InputLabel htmlFor="remark">備考</InputLabel>
        <Textarea
          id="remark"
          name="remark"
          required={false}
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          aria-describedby="remark-error"
          rows={5}
        />
        <div id="remark-error" aria-live="polite" aria-atomic="true">
          {state.errors?.remark && (
            <ErrorMessages messages={state.errors.remark} />
          )}
        </div>
      </div>
      <input
        type="hidden"
        name="insuranceEnabled"
        value={insuranceEnableds[0]}
      />
      <Select.Root
        positioning={{ sameWidth: true }}
        width="100%"
        collection={createListCollection({ items: insuranceEnableds })}
        onValueChange={(e) => setInsuranceEnableds(e.value)}
        value={insuranceEnableds}
        name="insuranceEnabled"
        aria-describedby="insuranceEnabled-error"
      >
        <Select.Label>
          保険利用可否 <Tag>必須</Tag>
        </Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="保険利用可否を選択してください。"></Select.ValueText>
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
