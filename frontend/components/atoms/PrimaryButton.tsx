import { Button } from '@chakra-ui/react';
import { memo } from 'react';
import type { ButtonProps } from '@chakra-ui/react';
import type { FC } from 'react';

const PrimaryButton: FC<ButtonProps> = ({ children, ...props }) => (
  <Button bgColor="primary.main" color="white" {...props}>
    {children}
  </Button>
);

const Memoed = memo(PrimaryButton);

export { Memoed as PrimaryButton };
