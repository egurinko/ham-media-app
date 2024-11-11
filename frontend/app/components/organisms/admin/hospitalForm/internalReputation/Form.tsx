'use client';

import { createListCollection } from '@ark-ui/react';
import { useState, useActionState } from 'react';
import { Select } from '@/app/components/atoms';
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
} from '@/app/utils/formSchema/hospital/internalReputation';
import AnglesUpDownIcon from '@/assets/angles-up-down.svg';
import CheckIcon from '@/assets/check.svg';
import { css } from '@/styled/css';
import { stack } from '@/styled/patterns';
import { updateHospitalInternalReputationAction } from './form.action';
import type { FC } from 'react';

type Props = {
  initialHospitalInternalReputation: FormSchema;
};

const STARS: { value: string; label: string }[] = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
];

export const Form: FC<Props> = ({ initialHospitalInternalReputation }) => {
  const initialState: FormState = { message: '', errors: {} };
  const [state, dispatch] = useActionState(
    updateHospitalInternalReputationAction,
    initialState,
  );
  const [stars, setStars] = useState<string[]>([
    String(initialHospitalInternalReputation.star),
  ]);
  const [remark, setRemark] = useState(
    initialHospitalInternalReputation.remark,
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
        value={initialHospitalInternalReputation.hospitalId}
      />
      <input type="hidden" name="star" value={stars[0]} />
      <Select.Root
        positioning={{ sameWidth: true }}
        width="100%"
        collection={createListCollection({ items: STARS })}
        onValueChange={(e) => setStars(e.value)}
        value={stars}
        name="star"
        aria-describedby="star-error"
      >
        <Select.Label>
          星 <Tag>必須</Tag>
        </Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="星を選択してください。"></Select.ValueText>
            <Icon source={<AnglesUpDownIcon />} width={10} height={10} />
          </Select.Trigger>
        </Select.Control>
        <Select.Positioner>
          <Select.Content>
            {STARS.map((star) => (
              <Select.Item key={star.value} item={star.value}>
                <Select.ItemText>{star.value}</Select.ItemText>
                <Select.ItemIndicator>
                  <Icon source={<CheckIcon />} width={15} height={15} />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Select.Root>
      <div id="star-error" aria-live="polite" aria-atomic="true">
        {state.errors?.star && <ErrorMessages messages={state.errors.star} />}
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
      <SubmitButton text="更新する" />
    </form>
  );
};
