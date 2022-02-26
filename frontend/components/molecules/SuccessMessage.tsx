import { FlashMessage } from './FlashMessage';

type Props = {
  message: string;
  data?: null | Record<string, any>;
};

const SuccessMessage: React.FC<Props> = ({ message, data }) => {
  return data ? <FlashMessage message={message} status="success" /> : null;
};

export { SuccessMessage };
