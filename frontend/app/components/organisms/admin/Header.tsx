import Image from 'next/image';
import { DrawerMenu } from '@/app/components/organisms/admin/DrawerMenu';
import { css } from '@/styled/css';
import type { FC } from 'react';

type Props = {
  internalUserName: string;
};

export const Header: FC<Props> = ({ internalUserName }) => (
  <div
    className={css({
      display: {
        base: 'flex',
        sm: 'none',
      },
      justifyContent: 'space-between',
      position: 'fixed',
      minW: '100%',
      p: 'md',
      bgColor: 'background.main',
    })}
  >
    <Image
      src="/ham_media_logo.png"
      alt="ハムメディアロゴ"
      width="150"
      height="150"
      priority={true}
    />
    <DrawerMenu internalUserName={internalUserName} />
  </div>
);
