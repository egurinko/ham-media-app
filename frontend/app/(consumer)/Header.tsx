import Image from 'next/image';
import Link from 'next/link';
import { RedirectIcon } from '@/components/atoms/assets/RedirectIcon';
import { css } from '@/styled/css';
import type { FC } from 'react';

export const Header: FC<NoProps> = () => (
  <header>
    <nav
      className={css({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        height: '60px',
        bgColor: 'white',
      })}
    >
      <div className={css({ cursor: 'pointer', mr: '5' })}>
        <Link href="/hospitals">
          <Image
            src="/ham_media_logo.png"
            alt="ハムメディアロゴ"
            width="0"
            height="0"
            sizes="100vw"
            style={{ width: 150, height: 'auto' }}
            priority={true}
          />
        </Link>
      </div>
      <div className={css({ pos: 'absolute', right: 0 })}>
        <Link href="https://ham-media.net">
          <div
            className={css({
              fill: 'primary.main',
              p: 1,
              mr: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            })}
          >
            <RedirectIcon width={20} height={20} />
            <span className={css({ fontSize: 'sm' })}>HPへ</span>
          </div>
        </Link>
      </div>
    </nav>
  </header>
);
