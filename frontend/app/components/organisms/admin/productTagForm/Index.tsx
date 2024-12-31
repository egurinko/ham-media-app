'use client';

import { useState, useActionState } from 'react';
import { Alert } from '@/app/components/atoms/Alert';
import { Input } from '@/app/components/atoms/Input';
import { SubmitButton } from '@/app/components/atoms/SubmitButton';
import { ErrorMessages } from '@/app/components/molecules/ErrorMessages';
import type { State } from '@/app/utils/formSchema/productTag';
import { css } from '@/styled/css';
import type { FC } from 'react';

type Props = {
  handleSubmit: (prevState: State, formData: FormData) => Promise<State>;
  initialProductTag: {
    productTagGroupId?: number;
    id?: string;
    name: string;
  };
  submitLabel: string;
};

export const ProductTagForm: FC<Props> = ({
  handleSubmit,
  initialProductTag,
  submitLabel,
}) => {
  const initialState: State = { message: '', errors: {} };
  const [state, dispatch] = useActionState(handleSubmit, initialState);
  const [name, setName] = useState(initialProductTag.name);

  return (
    <form
      className={css({
        display: 'flex',
        flexDir: 'row',
        width: '100%',
        alignItems: 'center',
      })}
      action={dispatch}
    >
      {state.message && <Alert visual="error">{state.message}</Alert>}

      <input type="hidden" name="id" value={initialProductTag.id} />
      <input
        type="hidden"
        name="productTagGroupId"
        value={initialProductTag.productTagGroupId}
      />
      <Input
        id="name"
        name="name"
        required={true}
        value={name}
        fullWidth
        onChange={(e) => setName(e.target.value)}
        aria-describedby="name-error"
      />

      {state.errors?.name && (
        <div id="name-error" aria-live="polite" aria-atomic="true">
          <ErrorMessages messages={state.errors.name} />
        </div>
      )}
      <SubmitButton
        text={submitLabel}
        className={css({ mt: 'none', w: '80px', mx: 'sm' })}
      />
    </form>
  );
};
