import { Text, Box } from '@chakra-ui/react';
import { memo } from 'react';
import { Card } from '@/components/atoms/Card';
import type { FC, PropsWithChildren } from 'react';

type Props = {
  title: string;
};

const TitleCard: FC<PropsWithChildren<Props>> = ({ title, children }) => (
  <Card>
    <Box textAlign="center" mb="2">
      <Text as="span" p="1" borderBottom="2px" borderColor="primary.main">
        {title}
      </Text>
    </Box>
    {children}
  </Card>
);

const Memoed = memo(TitleCard);

export { Memoed as TitleCard };
