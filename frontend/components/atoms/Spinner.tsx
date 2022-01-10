import { Spinner as ChakraSpinner, SpinnerProps } from '@chakra-ui/react';

type Props = {
  size?: SpinnerProps['size'];
  loading: boolean;
};

const Spinner: React.FC<Props> = ({ size = 'xl', loading }) => (
  <>{loading ? <ChakraSpinner size={size} color="primary.main" /> : null}</>
);

export { Spinner };
