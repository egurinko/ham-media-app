import { Button, ButtonProps } from '@chakra-ui/react';

const SecondaryButton: React.FC<ButtonProps> = ({ children, ...props }) => (
  <Button bgColor="primary.light" color="primary.main" {...props}>
    {children}
  </Button>
);

export { SecondaryButton };
