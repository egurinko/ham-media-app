import { Text, Box } from '@chakra-ui/react';
import Card from '@/components/atoms/Card';

type Props = {
  title: string;
};

const TitleCard: React.FC<Props> = ({ title, children }) => {
  return (
    <Card>
      <Box textAlign="center" mb="2">
        <Text as="span" p="1" borderBottom="2px" borderColor="primary.main">
          {title}
        </Text>
      </Box>
      {children}
    </Card>
  );
};

export default TitleCard;
