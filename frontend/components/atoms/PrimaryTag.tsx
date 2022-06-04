import { Tag } from '@chakra-ui/react';
import { memo } from 'react';
import type { TagProps } from '@chakra-ui/react';
import type { FC } from 'react';

const PrimaryTag: FC<TagProps> = ({ children, ...props }) => (
  <Tag bgColor="primary.main" color="white" {...props}>
    {children}
  </Tag>
);

const Memoed = memo(PrimaryTag);

export { Memoed as PrimaryTag };
