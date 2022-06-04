import { memo } from 'react';
import { FlashMessage } from './FlashMessage';

type Props = {
  message: string;
  data?: null | Record<string, unknown>;
};

const SuccessMessage: React.FC<Props> = ({ message, data }) =>
  data ? <FlashMessage message={message} status="success" /> : null;

const Memoed = memo(SuccessMessage);

export { Memoed as SuccessMessage };
