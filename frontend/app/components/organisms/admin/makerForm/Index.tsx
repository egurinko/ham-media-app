'use client';

import { useState, useActionState } from 'react';
import { Input } from '@/app/components/atoms/Input';
import { InputLabel } from '@/app/components/atoms/InputLabel';
import { SubmitButton } from '@/app/components/atoms/SubmitButton';
import { Tag } from '@/app/components/atoms/Tag';
import { ErrorMessages } from '@/app/components/molecules/ErrorMessages';
import type { State } from '@/app/utils/formSchema/maker';
import { css } from '@/styled/css';
import { stack } from '@/styled/patterns';
import type { FC } from 'react';

type Props = {
  handleSubmit: (prevState: State, formData: FormData) => Promise<State>;
  initialMaker: {
    id?: string;
    name: string;
  };
  submitLabel: string;
};

export const MakerForm: FC<Props> = ({
  handleSubmit,
  initialMaker,
  submitLabel,
}) => {
  const initialState: State = { message: '', errors: {} };
  const [state, dispatch] = useActionState(handleSubmit, initialState);
  const [name, setName] = useState(initialMaker.name);

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
      <input type="hidden" name="id" value={initialMaker.id} />
      <div className={stack()}>
        <InputLabel htmlFor="name">
          メーカー名 <Tag>必須</Tag>
        </InputLabel>
        <Input
          id="name"
          name="name"
          required={true}
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-describedby="name-error"
        />
        <div id="name-error" aria-live="polite" aria-atomic="true">
          {state.errors?.name && <ErrorMessages messages={state.errors.name} />}
        </div>
      </div>
      <SubmitButton text={submitLabel} />
    </form>
  );
};
