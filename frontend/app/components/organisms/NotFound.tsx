import Image from 'next/image';
import { Typography } from '@/app/components/atoms/Typography';
import { css } from '@/styled/css';

export const NotFound = () => (
  <div
    className={css({
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignContent: 'center',
      my: { base: 16, md: 32 },
    })}
  >
    <div className={css({ textAlign: 'center' })}>
      <Typography
        variant="headlineL"
        className={css({ color: 'primary.main', mb: '4' })}
      >
        404
      </Typography>
      <Typography variant="headlineS" bold={true} className={css({ mb: '2' })}>
        お探しのページが見つかりません
      </Typography>
      <Typography variant="body2">
        URLに誤りがあるか、ページが移動または削除された可能性がございます。
      </Typography>
    </div>
    <div className={css({ my: 'auto' })}>
      <Image
        src="/hamster_sleep.png"
        alt="NotFoundロゴ"
        width={300}
        height={170}
      />
    </div>
  </div>
);
