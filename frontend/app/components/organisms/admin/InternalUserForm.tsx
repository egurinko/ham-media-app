'use client';

import { useState, useActionState } from 'react';
import { Select } from '@/app/components/atoms';
import { Icon } from '@/app/components/atoms/Icon';
import { Input } from '@/app/components/atoms/Input';
import { InputLabel } from '@/app/components/atoms/InputLabel';
import { SubmitButton } from '@/app/components/atoms/SubmitButton';
import { Tag } from '@/app/components/atoms/Tag';
import { ErrorMessages } from '@/app/components/molecules/ErrorMessages';
import type { State } from '@/app/utils/formSchema/internalUser';
import AnglesUpDownIcon from '@/assets/angles-up-down.svg';
import CheckIcon from '@/assets/check.svg';
import { css } from '@/styled/css';
import { stack } from '@/styled/patterns';
import type { FC } from 'react';

type Role = {
  id: number;
  name: string;
};

type Props = {
  roles: Role[];
  handleSubmit: (prevState: State, formData: FormData) => Promise<State>;
  initialInternalUser: {
    id?: string;
    name: string;
    email: string;
    password: string;
    discordUserId: string;
    roleId: string[];
  };
  submitLabel: string;
};

export const InternalUserForm: FC<Props> = ({
  roles,
  handleSubmit,
  initialInternalUser,
  submitLabel,
}) => {
  const initialState: State = { message: '', errors: {} };
  const items = roles.map((role) => ({
    value: String(role.id),
    label: role.name,
  }));
  const [state, dispatch] = useActionState(handleSubmit, initialState);
  const [name, setName] = useState(initialInternalUser.name);
  const [email, setEmail] = useState(initialInternalUser.email);
  const [password, setPassword] = useState(initialInternalUser.password);
  const [discordUserId, setDiscordUserId] = useState(
    initialInternalUser.discordUserId,
  );
  const [roleIds, setRoleIds] = useState<string[]>(initialInternalUser.roleId);

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
      <input type="hidden" name="id" value={initialInternalUser.id} />
      <div className={stack()}>
        <InputLabel htmlFor="name">
          ユーザ名 <Tag>必須</Tag>
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
        <InputLabel htmlFor="email">
          メールアドレス <Tag>必須</Tag>
        </InputLabel>
        <Input
          id="email"
          name="email"
          type="email"
          required={true}
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-describedby="email-error"
        />
        <div id="email-error" aria-live="polite" aria-atomic="true">
          {state.errors?.email && (
            <ErrorMessages messages={state.errors.email} />
          )}
        </div>
      </div>
      <div className={stack()}>
        <InputLabel htmlFor="password">
          パスワード <Tag>必須</Tag>
        </InputLabel>
        <Input
          id="password"
          name="password"
          type="password"
          required={true}
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-describedby="password-error"
        />
        <div id="password-error" aria-live="polite" aria-atomic="true">
          {state.errors?.password && (
            <ErrorMessages messages={state.errors.password} />
          )}
        </div>
      </div>
      <div className={stack()}>
        <InputLabel htmlFor="discord_user_id">
          Discord user id <Tag>必須</Tag>
        </InputLabel>
        <Input
          id="discord_user_id"
          name="discord_user_id"
          required={true}
          fullWidth
          value={discordUserId}
          onChange={(e) => setDiscordUserId(e.target.value)}
          aria-describedby="discord_user_id-error"
        />
        <div id="discord_user_id-error" aria-live="polite" aria-atomic="true">
          {state.errors?.discord_user_id && (
            <ErrorMessages messages={state.errors.discord_user_id} />
          )}
        </div>
      </div>
      <input type="hidden" name="roleId" value={roleIds[0]} />
      <Select.Root
        positioning={{ sameWidth: true }}
        width="100%"
        items={items}
        onValueChange={(e) => setRoleIds(e.value)}
        value={roleIds}
        aria-describedby="role-error"
      >
        <Select.Label>
          ロール <Tag>必須</Tag>
        </Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="ロールを選択してください。"></Select.ValueText>
            <Icon source={<AnglesUpDownIcon />} width={10} height={10} />
          </Select.Trigger>
        </Select.Control>
        <Select.Positioner>
          <Select.Content>
            {items.map((role) => (
              <Select.Item key={role.value} item={role}>
                <Select.ItemText>{role.label}</Select.ItemText>
                <Select.ItemIndicator>
                  <Icon source={<CheckIcon />} width={15} height={15} />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Select.Root>
      <div id="role-error" aria-live="polite" aria-atomic="true">
        {state.errors?.roleId && (
          <ErrorMessages messages={state.errors.roleId} />
        )}
      </div>
      <SubmitButton text={submitLabel} />
    </form>
  );
};
