import { memo } from 'react';
import { FlashMessage } from './FlashMessage';
import type { FC } from 'react';

type Props = {
  message: string;
  data?: null | Record<string, unknown>;
};

const SuccessMessage: FC<Props> = ({ message, data }) =>
  data ? <FlashMessage message={message} status="success" /> : null;

const Memoed = memo(SuccessMessage);

export { Memoed as SuccessMessage };
