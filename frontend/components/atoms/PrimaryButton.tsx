import { Button } from '@chakra-ui/react';
import type { ButtonProps } from '@chakra-ui/react';

const PrimaryButton: React.FC<ButtonProps> = ({ children, ...props }) => (
  <Button bgColor="primary.main" color="white" {...props}>
    {children}
  </Button>
);

export { PrimaryButton };
