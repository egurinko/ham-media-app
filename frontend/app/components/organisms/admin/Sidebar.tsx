import Image from 'next/image';
import { Button } from '@/app/components/atoms/Button';
import { Typography } from '@/app/components/atoms/Typography';
import { ThemeChanger } from '@/app/components/molecules/ThemeChanger';
import { Navigation } from '@/app/components/organisms/admin/Navigation';
import { css } from '@/styled/css';
import type { FC } from 'react';

type Props = {
  internalUserName: string;
};

export const Sidebar: FC<Props> = ({ internalUserName }) => (
  <aside
    className={css({
      display: {
        base: 'none',
        sm: 'flex',
      },
      flexDir: 'column',
      alignItems: 'center',
      padding: 'lg',
      width: '250px',
    })}
  >
    <div
      className={css({
        my: '2xl',
      })}
    >
      <Image
        src="/ham_media_logo.png"
        alt="ハムメディアロゴ"
        width="170"
        height="170"
        priority={true}
      />
    </div>
    <Navigation />
    <div
      className={css({
        borderTopWidth: 'thin',
        borderColor: 'outline.main',
        mt: '2xl',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: 'md',
        width: '100%',
        alignItems: 'center',
      })}
    >
      <Typography
        variant="body1"
        className={css({
          mt: 'md',
        })}
      >
        {internalUserName}
      </Typography>
      <Button
        visual="outlined"
        className={css({
          width: '120px',
        })}
      >
        ログアウト
      </Button>
      <ThemeChanger />
    </div>
  </aside>
);
