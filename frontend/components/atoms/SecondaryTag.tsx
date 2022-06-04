import { Tag } from '@chakra-ui/react';
import { memo } from 'react';
import type { TagProps } from '@chakra-ui/react';

const SecondaryTag: React.FC<TagProps> = ({ children, ...props }) => (
  <Tag bgColor="primary.light" color="primary.main" {...props}>
    {children}
  </Tag>
);

const Memoed = memo(SecondaryTag);

export { Memoed as SecondaryTag };
