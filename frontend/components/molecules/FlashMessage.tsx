import { Alert, AlertIcon } from '@chakra-ui/react';
import { memo } from 'react';
import type { FC } from 'react';

type Props = {
  message: string;
  status: 'success' | 'error';
};

const FlashMessage: FC<Props> = ({ message, status }) => (
  <Alert my="4" status={status}>
    <AlertIcon />
    {message}
  </Alert>
);

const Memoed = memo(FlashMessage);

export { Memoed as FlashMessage };
