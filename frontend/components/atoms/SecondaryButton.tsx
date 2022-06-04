import { Button } from '@chakra-ui/react';
import { memo } from 'react';
import type { ButtonProps } from '@chakra-ui/react';
import type { FC } from 'react';

const SecondaryButton: FC<ButtonProps> = ({ children, ...props }) => (
  <Button bgColor="primary.light" color="primary.main" {...props}>
    {children}
  </Button>
);

const Memoed = memo(SecondaryButton);

export { Memoed as SecondaryButton };
