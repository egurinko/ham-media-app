import { Alert } from '@/app/components/atoms/Alert';
import { Typography } from '@/app/components/atoms/Typography';
import { flex } from '@/styled/patterns';
import type { FC } from 'react';

export const StockRequestNote: FC<NoProps> = () => (
  <Alert
    visual="success"
    className={flex({
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 'xs',
    })}
  >
    <Typography variant="body2" display="block">
      食品や床材などの消耗品は基本的に自己負担です。ただし、ご支援品の在庫があれば遠慮なくリクエストしてください
    </Typography>
    <Typography variant="body2" display="block">
      送料を下げるためリクエスト内容は責任者がなるべく同じになるようにしてください
    </Typography>
    <Typography variant="body2" display="block">
      1回のリクエスト内容が送料を上回るようにしてください.送料は安くても1100円〜1400円くらいかかります
    </Typography>
  </Alert>
);
