import { Tag, TagProps } from '@chakra-ui/react';

const SecondaryTag: React.FC<TagProps> = ({ children, ...props }) => (
  <Tag bgColor="primary.light" color="primary.main" {...props}>
    {children}
  </Tag>
);

export { SecondaryTag };
