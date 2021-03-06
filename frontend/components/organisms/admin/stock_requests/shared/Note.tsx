import { CheckCircleIcon } from '@chakra-ui/icons';
import { Box, Alert, ListItem, List, ListIcon } from '@chakra-ui/react';
import { memo } from 'react';
import type { FC } from 'react';

const Note: FC<NoProps> = () => (
  <Alert fontSize="xs" mt="4" status="warning">
    <Box>
      <List textAlign="left">
        <ListItem>
          <ListIcon as={CheckCircleIcon} />
          食品や床材などの消耗品は基本的に自己負担です。ただし、ご支援品の在庫があれば遠慮なくリクエストしてください
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} />
          送料を下げるためリクエスト内容は責任者がなるべく同じになるようにしてください
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} />
          1回のリクエスト内容が送料を上回るようにしてください.送料は安くても1100円〜1400円くらいかかります
        </ListItem>
      </List>
    </Box>
  </Alert>
);

const Memoed = memo(Note);

export { Memoed as Note };
