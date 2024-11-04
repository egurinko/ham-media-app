'use client';

import { useState, useActionState } from 'react';
import { Alert } from '@/app/components/atoms/Alert';
import { Input } from '@/app/components/atoms/Input';
import { InputLabel } from '@/app/components/atoms/InputLabel';
import { SubmitButton } from '@/app/components/atoms/SubmitButton';
import { Switch } from '@/app/components/atoms/Switch';
import { Tag } from '@/app/components/atoms/Tag';
import { Typography } from '@/app/components/atoms/Typography';
import { ErrorMessages } from '@/app/components/molecules/ErrorMessages';
import type { FormState, FormSchema } from '@/app/utils/formSchema/hospital';
import { css } from '@/styled/css';
import { stack } from '@/styled/patterns';
import type { FC } from 'react';

type Props = {
  handleSubmit: (
    prevState: FormState,
    formData: FormData,
  ) => Promise<FormState>;
  initialHospital: FormSchema;
};

export const HospitalForm: FC<Props> = ({ handleSubmit, initialHospital }) => {
  const initialState: FormState = { message: '', errors: {} };
  const [state, dispatch] = useActionState(handleSubmit, initialState);
  const [name, setName] = useState(initialHospital.name);
  const [url, setUrl] = useState(initialHospital.url);
  const [deleted, setDeleted] = useState(initialHospital.deleted);
  const [internalMemo, setInternalMemo] = useState(
    initialHospital.internalMemo,
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
      <input type="hidden" name="id" value={initialHospital.id} />
      <div className={stack()}>
        <InputLabel htmlFor="name">
          病院名 <Tag>必須</Tag>
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
      <div className={stack()}>
        <InputLabel htmlFor="url">URL</InputLabel>
        <Input
          id="url"
          name="url"
          type="url"
          required={false}
          fullWidth
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          aria-describedby="url-error"
        />
        <div id="url-error" aria-live="polite" aria-atomic="true">
          {state.errors?.url && <ErrorMessages messages={state.errors.url} />}
        </div>
      </div>
      <div className={stack()}>
        <input type="hidden" name="deleted" value={String(deleted)} />
        <Switch
          id="deleted"
          checked={!(deleted === 'true')}
          onCheckedChange={(details) =>
            setDeleted(!details.checked ? 'true' : 'false')
          }
        >
          公開状態
        </Switch>
        <div id="deleted-error" aria-live="polite" aria-atomic="true">
          {state.errors?.deleted && (
            <ErrorMessages messages={state.errors.deleted} />
          )}
        </div>
      </div>
      <div className={stack()}>
        <InputLabel htmlFor="internalMemo">内部メモ</InputLabel>
        <Input
          id="internalMemo"
          name="internalMemo"
          type="text"
          required={false}
          fullWidth
          value={internalMemo}
          onChange={(e) => setInternalMemo(e.target.value)}
          aria-describedby="internalMemo-error"
        />
        <Typography variant="caption">
          ※ LINE等には露出しないデータです
        </Typography>
        <div id="internalMemo-error" aria-live="polite" aria-atomic="true">
          {state.errors?.internalMemo && (
            <ErrorMessages messages={state.errors.internalMemo} />
          )}
        </div>
      </div>
      <SubmitButton text="登録する" />
    </form>
  );
};
