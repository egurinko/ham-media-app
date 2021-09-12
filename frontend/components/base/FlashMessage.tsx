import { Alert, AlertIcon } from '@chakra-ui/react';

type Props = {
  message: string;
  status: 'success' | 'error';
};

const FlashMessage: React.FC<Props> = ({ message, status }) => {
  return (
    <Alert my="4" status={status}>
      <AlertIcon />
      {message}
    </Alert>
  );
};

export default FlashMessage;
