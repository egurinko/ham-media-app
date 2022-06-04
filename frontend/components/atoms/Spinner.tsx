import { Spinner as ChakraSpinner } from '@chakra-ui/react';
import { memo } from 'react';
import type { SpinnerProps } from '@chakra-ui/react';

type Props = {
  size?: SpinnerProps['size'];
  loading: boolean;
};

const Spinner: React.FC<Props> = ({ size = 'xl', loading }) => (
  <>{loading ? <ChakraSpinner size={size} color="primary.main" /> : null}</>
);

const Memoed = memo(Spinner);

export { Memoed as Spinner };
