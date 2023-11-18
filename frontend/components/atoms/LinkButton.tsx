import { Button } from '@chakra-ui/react';
import Link from 'next/link';
import { memo } from 'react';
import type { ButtonProps } from '@chakra-ui/react';
import type { FC } from 'react';

type LinkButtonProps = {
  children: ButtonProps['children'];
  href: string;
};

const LinkButton: FC<LinkButtonProps> = ({ children, href }) => (
  <Button bgColor="primary.main" color="white" as={Link} href={href}>
    {children}
  </Button>
);

const Memoed = memo(LinkButton);

export { Memoed as LinkButton };
